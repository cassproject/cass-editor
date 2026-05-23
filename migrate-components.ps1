#!/usr/bin/env pwsh
# Bulk migrate remaining component files from Vuex $store to Pinia
# Handles all patterns found in the codebase

param(
    [string[]]$Files
)

foreach ($filePath in $Files) {
    if (!(Test-Path $filePath)) {
        Write-Host "SKIP: $filePath not found"
        continue
    }
    
    $content = Get-Content $filePath -Raw
    $fileName = Split-Path $filePath -Leaf
    
    if ($content -notmatch '\$store') {
        Write-Host "SKIP: $fileName - no refs"
        continue
    }
    
    # Count non-comment $store refs
    $lines = $content -split "`r?`n"
    $codeRefs = ($lines | Where-Object { $_ -match '\$store' -and $_ -notmatch '^\s*//' }).Count
    if ($codeRefs -eq 0) {
        Write-Host "SKIP: $fileName - only comments"
        continue
    }
    
    Write-Host "Processing: $fileName ($codeRefs code refs)"
    
    # ===== TEMPLATE PATTERNS (no 'this.' prefix) =====
    $content = $content -replace '\$store\.commit\(''app/closeModal''\)', 'useAppStore().closeModal()'
    $content = $content -replace '\$store\.commit\(''app/showModal'',\s*', 'useAppStore().openModal('
    $content = $content -replace '\$store\.commit\(''app/closeRightAside''\)', 'useAppStore().closeRightAside()'
    $content = $content -replace '\$store\.commit\(''app/showRightAside'',\s*', 'useAppStore().openRightAside('
    $content = $content -replace '\$store\.commit\(''app/closeSideNav''\)', 'useAppStore().closeSideNav()'
    $content = $content -replace '\$store\.commit\(''app/showSideNav''\)', 'useAppStore().openSideNav()'
    
    # Template getters
    $content = $content -replace '\$store\.getters\[''app/(\w+)''\]', 'useAppStore().$1'
    $content = $content -replace '\$store\.getters\[''editor/(\w+)''\]', 'useEditorStore().$1'
    $content = $content -replace '\$store\.getters\[''user/(\w+)''\]', 'useUserStore().$1'
    $content = $content -replace '\$store\.getters\[''featuresEnabled/(\w+)''\]', 'useFeaturesEnabledStore().$1'
    $content = $content -replace '\$store\.getters\[''lode/(\w+)''\]', 'useLodeStore().$1'
    $content = $content -replace '\$store\.getters\[''crosswalk/(\w+)''\]', 'useCrosswalkStore().$1'
    $content = $content -replace '\$store\.getters\[''configuration/(\w+)''\]', 'useConfigurationStore().$1'
    
    # Template state
    $content = $content -replace '\$store\.state\.editor\.(\w+)', 'useEditorStore().$1'
    $content = $content -replace '\$store\.state\.app\.(\w+)', 'useAppStore().$1'
    $content = $content -replace '\$store\.state\.user\.(\w+)', 'useUserStore().$1'
    $content = $content -replace '\$store\.state\.lode\.(\w+)', 'useLodeStore().$1'
    $content = $content -replace '\$store\.state\.crosswalk\.(\w+)', 'useCrosswalkStore().$1'
    $content = $content -replace '\$store\.state\.featuresEnabled\.(\w+)', 'useFeaturesEnabledStore().$1'
    $content = $content -replace '\$store\.state\.configuration\.(\w+)', 'useConfigurationStore().$1'
    
    # ===== CODE PATTERNS =====
    
    # State access
    $content = $content -replace '(?:this|me)\.\$store\.state\.editor\.(\w+)', 'useEditorStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.state\.app\.(\w+)', 'useAppStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.state\.user\.(\w+)', 'useUserStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.state\.lode\.(\w+)', 'useLodeStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.state\.crosswalk\.(\w+)', 'useCrosswalkStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.state\.featuresEnabled\.(\w+)', 'useFeaturesEnabledStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.state\.configuration\.(\w+)', 'useConfigurationStore().$1'
    
    # Getters
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''app/(\w+)''\]', 'useAppStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''editor/(\w+)''\]', 'useEditorStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''user/(\w+)''\]', 'useUserStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''lode/(\w+)''\]', 'useLodeStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''featuresEnabled/(\w+)''\]', 'useFeaturesEnabledStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''crosswalk/(\w+)''\]', 'useCrosswalkStore().$1'
    $content = $content -replace '(?:this|me)\.\$store\.getters\[''configuration/(\w+)''\]', 'useConfigurationStore().$1'
    
    # ===== COMMITS - Special cases first =====
    # App nav mutations
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/closeModal''\)', 'useAppStore().closeModal()'
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/showModal'',\s*', 'useAppStore().openModal('
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/closeRightAside''\)', 'useAppStore().closeRightAside()'
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/showRightAside'',\s*', 'useAppStore().openRightAside('
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/closeSideNav''\)', 'useAppStore().closeSideNav()'
    $content = $content -replace '(?:this|me)\.\$store\.commit\(''app/showSideNav''\)', 'useAppStore().openSideNav()'
    
    # Generic app commits with value
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''app/(\w+)'',\s*', {
        param($m)
        $prop = $m.Groups[1].Value
        if ($prop -match '^(showModal|closeModal|showRightAside|closeRightAside|showSideNav|closeSideNav)$') { return $m.Value }
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useAppStore().$setter("
    })
    # Generic app commits without value
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''app/(\w+)''\)', {
        param($m)
        $prop = $m.Groups[1].Value
        if ($prop -match '^(closeModal|closeRightAside|closeSideNav)$') { return $m.Value }
        if ($prop.StartsWith("clear") -or $prop.StartsWith("reset")) { return "useAppStore().$prop()" }
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
    
    # User commits
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''user/(\w+)'',\s*', {
        param($m)
        $prop = $m.Groups[1].Value
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useUserStore().$setter("
    })
    
    # Lode commits
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''lode/(\w+)'',\s*', {
        param($m)
        $prop = $m.Groups[1].Value
        if ($prop.StartsWith("set") -or $prop.StartsWith("add") -or $prop.StartsWith("remove") -or $prop.StartsWith("clear")) {
            return "useLodeStore().$prop("
        }
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useLodeStore().$setter("
    })
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''lode/(\w+)''\)', {
        param($m)
        $prop = $m.Groups[1].Value
        if ($prop.StartsWith("set") -or $prop.StartsWith("add") -or $prop.StartsWith("remove") -or $prop.StartsWith("clear")) {
            return "useLodeStore().$prop()"
        }
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useLodeStore().$setter()"
    })
    
    # Features commits
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
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''configuration/(\w+)''\)', {
        param($m)
        $prop = $m.Groups[1].Value
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useConfigurationStore().$setter()"
    })
    
    # Crosswalk commits
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''crosswalk/(\w+)'',\s*', {
        param($m)
        $prop = $m.Groups[1].Value
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useCrosswalkStore().$setter("
    })
    
    # Environment commits
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.commit\(''environment/(\w+)'',\s*', {
        param($m)
        $prop = $m.Groups[1].Value
        $setter = "set" + $prop.Substring(0,1).ToUpper() + $prop.Substring(1)
        return "useEnvironmentStore().$setter("
    })
    
    # ===== DISPATCHES =====
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.dispatch\(''app/(\w+)'',\s*', {
        param($m) return "useAppStore().$($m.Groups[1].Value)(" })
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.dispatch\(''app/(\w+)''\)', {
        param($m) return "useAppStore().$($m.Groups[1].Value)()" })
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.dispatch\(''editor/(\w+)'',\s*', {
        param($m) return "useEditorStore().$($m.Groups[1].Value)(" })
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.dispatch\(''editor/(\w+)''\)', {
        param($m) return "useEditorStore().$($m.Groups[1].Value)()" })
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.dispatch\(''lode/(\w+)'',\s*', {
        param($m)
        $action = $m.Groups[1].Value
        if ($action -eq "schemata") { return "useLodeStore().processSchemata(" }
        if ($action -eq "schemaFallback") { return "useLodeStore().processSchemaFallback(" }
        return "useLodeStore().$action("
    })
    $content = [regex]::Replace($content, '(?:this|me)\.\$store\.dispatch\(''lode/(\w+)''\)', {
        param($m)
        $action = $m.Groups[1].Value
        if ($action -eq "schemata") { return "useLodeStore().processSchemata()" }
        if ($action -eq "schemaFallback") { return "useLodeStore().processSchemaFallback()" }
        return "useLodeStore().$action()"
    })
    
    # ===== Vuex mapState/mapGetters → Pinia =====
    # import {mapState, mapGetters} from 'vuex' → import {mapState} from 'pinia'
    $content = $content -replace "import\s*\{[^}]*mapState[^}]*\}\s*from\s*'vuex';", "import {mapState} from 'pinia';"
    # import {mapState} from 'vuex' → import {mapState} from 'pinia'
    $content = $content -replace "import\s*\{mapGetters\}\s*from\s*'vuex';", "import {mapState} from 'pinia';"
    
    # ===== Add missing store imports =====
    $storeImports = @{}
    if ($content -match 'useAppStore\(\)') { $storeImports['app'] = "import { useAppStore } from '@/stores/app';" }
    if ($content -match 'useEditorStore\(\)') { $storeImports['editor'] = "import { useEditorStore } from '@/stores/editor';" }
    if ($content -match 'useUserStore\(\)') { $storeImports['user'] = "import { useUserStore } from '@/stores/user';" }
    if ($content -match 'useLodeStore\(\)') { $storeImports['lode'] = "import { useLodeStore } from '@/stores/lode';" }
    if ($content -match 'useFeaturesEnabledStore\(\)') { $storeImports['features'] = "import { useFeaturesEnabledStore } from '@/stores/featuresEnabled';" }
    if ($content -match 'useCrosswalkStore\(\)') { $storeImports['crosswalk'] = "import { useCrosswalkStore } from '@/stores/crosswalk';" }
    if ($content -match 'useConfigurationStore\(\)') { $storeImports['config'] = "import { useConfigurationStore } from '@/stores/configuration';" }
    if ($content -match 'useEnvironmentStore\(\)') { $storeImports['env'] = "import { useEnvironmentStore } from '@/stores/environment';" }
    
    foreach ($key in $storeImports.Keys) {
        $importLine = $storeImports[$key]
        if ($content -notmatch [regex]::Escape($importLine)) {
            $content = $content -replace '(export\s+default\s*\{)', "$importLine`r`n`$1"
        }
    }
    
    # Write back
    Set-Content -Path $filePath -Value $content -NoNewline
    
    # Count remaining non-comment refs
    $remaining = ($content -split "`r?`n" | Where-Object { $_ -match '\$store' -and $_ -notmatch '^\s*//' }).Count
    if ($remaining -gt 0) {
        Write-Host "  WARNING: $remaining remaining non-comment refs"
        $content -split "`r?`n" | ForEach-Object -Begin { $n = 0 } -Process {
            $n++
            if ($_ -match '\$store' -and $_ -notmatch '^\s*//') {
                Write-Host "    L${n}: $($_.Trim())"
            }
        }
    } else {
        Write-Host "  OK: Clean"
    }
}

Write-Host "`nDone!"
