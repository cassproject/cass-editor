export const curatedPlugins = {
    computed: {
        curatedPlugins: function() {
            return [
                {
                    "id": "curatedPlugin1",
                    "name": "Plugin Test 1",
                    "description": "Test plugin - google.com",
                    "url": "https://www.google.com/",
                    "launchType": "main",
                    "launchLocation": "Plugin Test" // This will be the menu category if launchType = 'main', or the screen name if launchType = 'screen'
                },
                {
                    "id": "curatedPlugin2",
                    "name": "Plugin Test 2",
                    "description": "Test plugin - tomahawknation.com",
                    "url": "https://www.tomahawknation.com/",
                    "launchType": "main",
                    "launchLocation": "Competencies & Frameworks" // This will be the menu category if launchType = 'main', or the screen name if launchType = 'screen'}];
                }
            ];
        }
    }
};