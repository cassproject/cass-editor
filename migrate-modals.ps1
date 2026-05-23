#!/usr/bin/env pwsh
# Fix remaining $store references in modalContent Vue files
# Handle template-level $store refs and missed this.$store patterns

$modalDir = "c:\workspace\cass-editor\src\components\modalContent"

Get-ChildItem -Path "$modalDir\*.vue" | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw
    
    if ($content -notmatch '\$store') {
        return
    }
    
    Write-Host "Processing: $($_.Name)"
    
    # ===== TEMPLATE PATTERNS (no 'this.' prefix) =====
    # @click="$store.commit('app/closeModal')" -> @click="useAppStore().closeModal()"
    $content = $content -replace '\$store\.commit\(''app/closeModal''\)', 'useAppStore().closeModal()'
    $content = $content -replace '\$store\.commit\(''app/showModal'',\s*', 'useAppStore().openModal('
    $content = $content -replace '\$store\.commit\(''app/closeRightAside''\)', 'useAppStore().closeRightAside()'
    
    # Template getters: $store.getters['app/xxx'] -> useAppStore().xxx  
    $content = $content -replace '\$store\.getters\[''app/(\w+)''\]', 'useAppStore().$1'
    $content = $content -replace '\$store\.getters\[''editor/(\w+)''\]', 'useEditorStore().$1'
    $content = $content -replace '\$store\.getters\[''user/(\w+)''\]', 'useUserStore().$1'
    $content = $content -replace '\$store\.getters\[''featuresEnabled/(\w+)''\]', 'useFeaturesEnabledStore().$1'
    $content = $content -replace '\$store\.getters\[''queryParams/(\w+)''\]', 'useEditorStore().queryParams.$1'
    
    # ===== REMAINING this.$store / me.$store PATTERNS =====
    
    # State access
    $content = $content -replace '(?:this|me)\.\$store\.state\.editor\.(\w+)', 'useEditorStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.state\.app\.(\w+)', 'useAppStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.state\.user\.(\w+)', 'useUserStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.state\.lode\.(\w+)', 'useLodeStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.state\.crosswalk\.(\w+)', 'useCrosswalkStore().$1'
    
    # Getters
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''app/(\w+)''\]', 'useAppStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''editor/(\w+)''\]', 'useEditorStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''user/(\w+)''\]', 'useUserStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''lode/(\w+)''\]', 'useLodeStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''featuresEnabled/(\w+)''\]', 'useFeaturesEnabledStore().$1'
    
    # Commits with value - app store special cases
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/closeModal''\)', 'useAppStore().closeModal()'
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/showModal'',\s*', 'useAppStore().openModal('
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/closeRightAside''\)', 'useAppStore().closeRightAside()'
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/showRightAside'',\s*', 'useAppStore().openRightAside('
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/refreshSearch'',\s*', 'useAppStore().setRefreshSearch('
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/rightAsideObject'',\s*', 'useAppStore().setRightAsideObject('
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/selectDirectory'',\s*', 'useAppStore().selectDirectory('
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/searchTerm'',\s*', 'useAppStore().setSearchTerm('
    
    # Generic app commits  
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''app/(\w+)'',\s*', {
        param($m)
        $prop = $m.Groups[1].Value
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useAppStore().$setter("
    })
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''app/(\w+)''\)', {
        param($m)
        $prop = $m.Groups[1].Value
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useAppStore().$setter()"
    })
    
    # Editor commits
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''editor/(\w+)'',\s*', {
        param($m)
        $prop = $m.Groups[1].Value
        if ($prop.StartsWith("set") -or $prop.StartsWith("add") -or $prop.StartsWith("clear") -or $prop.StartsWith("remove") -or $prop.StartsWith("webSocket")) {
            return "useEditorStore().$prop("
        }
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useEditorStore().$setter("
    })
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''editor/(\w+)''\)', {
        param($m)
        $prop = $m.Groups[1].Value
        if ($prop.StartsWith("set") -or $prop.StartsWith("add") -or $prop.StartsWith("clear") -or $prop.StartsWith("remove") -or $prop.StartsWith("webSocket")) {
            return "useEditorStore().$prop()"
        }
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useEditorStore().$setter()"
    })
    
    # Editor dispatch
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.dispatch\(''editor/(\w+)'',\s*', {
        param($m)
        return "useEditorStore().$($m.Groups[1].Value)("
    })
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.dispatch\(''editor/(\w+)''\)', {
        param($m)
        return "useEditorStore().$($m.Groups[1].Value)()"
    })
    
    # App dispatch
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.dispatch\(''app/(\w+)'',\s*', {
        param($m)
        return "useAppStore().$($m.Groups[1].Value)("
    })
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.dispatch\(''app/(\w+)''\)', {
        param($m)
        return "useAppStore().$($m.Groups[1].Value)()"
    })
    
    # Lode dispatch
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.dispatch\(''lode/(\w+)'',\s*', {
        param($m)
        $action = $m.Groups[1].Value
        if ($action -eq "schemata") { return "useLodeStore().processSchemata(" }
        if ($action -eq "schemaFallback") { return "useLodeStore().processSchemaFallback(" }
        return "useLodeStore().$action("
    })
    
    # User commits
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''user/(\w+)'',\s*', {
        param($m)
        $prop = $m.Groups[1].Value
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useUserStore().$setter("
    })
    
    # FeaturesEnabled commits
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''featuresEnabled/(\w+)'',\s*', {
        param($m)
        $prop = $m.Groups[1].Value
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useFeaturesEnabledStore().$setter("
    })

    # Configuration commits
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''configuration/(\w+)'',\s*', {
        param($m)
        $prop = $m.Groups[1].Value
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useConfigurationStore().$setter("
    })
    
    # Crosswalk commits
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''crosswalk/(\w+)'',\s*', {
        param($m)
        $prop = $m.Groups[1].Value
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useCrosswalkStore().$setter("
    })
    
    # Now check what store imports are actually needed and add missing ones
    $storeImports = @{}
    if ($content -match 'useAppStore\(\)') { $storeImports['app'] = "import { useAppStore } from '@/stores/app';" }
    if ($content -match 'useEditorStore\(\)') { $storeImports['editor'] = "import { useEditorStore } from '@/stores/editor';" }
    if ($content -match 'useUserStore\(\)') { $storeImports['user'] = "import { useUserStore } from '@/stores/user';" }
    if ($content -match 'useLodeStore\(\)') { $storeImports['lode'] = "import { useLodeStore } from '@/stores/lode';" }
    if ($content -match 'useFeaturesEnabledStore\(\)') { $storeImports['features'] = "import { useFeaturesEnabledStore } from '@/stores/featuresEnabled';" }
    if ($content -match 'useCrosswalkStore\(\)') { $storeImports['crosswalk'] = "import { useCrosswalkStore } from '@/stores/crosswalk';" }
    if ($content -match 'useConfigurationStore\(\)') { $storeImports['config'] = "import { useConfigurationStore } from '@/stores/configuration';" }
    if ($content -match 'useEnvironmentStore\(\)') { $storeImports['env'] = "import { useEnvironmentStore } from '@/stores/environment';" }
    
    # Add missing imports
    foreach ($key in $storeImports.Keys) {
        $importLine = $storeImports[$key]
        if ($content -notmatch [regex]::Escape($importLine)) {
            # Add before export default
            $content = $content -replace '(export\s+default\s*\{)', "$importLine`r`n`$1"
        }
    }
    
    # Write back
    Set-Content -Path $file -Value $content -NoNewline
    
    # Verify
    $remaining = ([regex]::Matches($content, '\$store')).Count
    if ($remaining -gt 0) {
        Write-Host "  WARNING: $remaining remaining refs"
        # Show first few remaining
        $lines = $content -split "`r?`n"
        for ($i = 0; $i -lt $lines.Length; $i++) {
            if ($lines[$i] -match '\$store') {
                Write-Host "    L$($i+1): $($lines[$i].Trim())"
            }
        }
    } else {
        Write-Host "  OK: Clean"
    }
}

Write-Host "`nDone!"
