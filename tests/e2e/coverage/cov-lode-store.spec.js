/**
 * Coverage tests for lode.js store module
 * 248 lines — exercises schema/property management mutations and getters.
 */

const { test, expect } = require('../fixtures');

test.describe('Lode Store Coverage', () => {

    test('Exercise lode store saving/adding property mutations and getters', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // isSavingProperty
            r.savePropDefault = store.lode.isSavingProperty;
            store.lode.setIsSavingProperty( true);
            r.savePropTrue = store.lode.isSavingProperty;
            store.lode.setIsSavingProperty( false);

            // isSavingThing
            r.saveThingDefault = store.lode.isSavingThing;
            store.lode.setIsSavingThing( true);
            r.saveThingTrue = store.lode.isSavingThing;
            store.lode.setIsSavingThing( false);

            // isAddingProperty
            r.addPropDefault = store.lode.isAddingProperty;
            store.lode.setIsAddingProperty( true);
            r.addPropTrue = store.lode.isAddingProperty;
            store.lode.setIsAddingProperty( false);

            // addingProperty
            r.addingPropDefault = store.lode.addingProperty;
            store.lode.setAddingProperty( 'http://schema.org/name');
            r.addingPropSet = store.lode.addingProperty;
            store.lode.setAddingProperty( '');

            // addingRange
            r.addingRangeDefault = store.lode.addingRange;
            store.lode.setAddingRange( ['http://schema.org/Text']);
            r.addingRangeSet = store.lode.addingRange;
            store.lode.setAddingRange( []);

            // addingChecked
            r.addingCheckedDefault = store.lode.addingChecked;
            store.lode.setAddingChecked( ['opt1', 'opt2']);
            r.addingCheckedSet = store.lode.addingChecked;
            store.lode.setAddingChecked( []);

            // includeRelations
            r.includeRelDefault = store.lode.includeRelations;
            store.lode.setIncludeRelations( false);
            r.includeRelFalse = store.lode.includeRelations;
            store.lode.setIncludeRelations( true);

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.savePropDefault).toBe(false);
        expect(result.savePropTrue).toBe(true);
        expect(result.saveThingDefault).toBe(false);
        expect(result.saveThingTrue).toBe(true);
        expect(result.addPropDefault).toBe(false);
        expect(result.addPropTrue).toBe(true);
        expect(result.addingPropDefault).toBe('');
        expect(result.addingPropSet).toBe('http://schema.org/name');
        expect(result.addingRangeDefault).toEqual([]);
        expect(result.addingRangeSet).toEqual(['http://schema.org/Text']);
        expect(result.addingCheckedDefault).toEqual([]);
        expect(result.addingCheckedSet).toEqual(['opt1', 'opt2']);
        expect(result.includeRelDefault).toBe(true);
        expect(result.includeRelFalse).toBe(false);
    });

    test('Exercise addingValues, numPropertyComponents, and competencySearchModal', async ({ page }) => {
        await page.goto('/#/frameworks?server=http://localhost/api/');
        await page.waitForLoadState('domcontentloaded');

        const result = await page.evaluate(() => {
            const store = window.__stores;
            if (!store) return null;
            const r = {};

            // setAddingValues with array of objects
            store.lode.setAddingValues( [
                { '@value': 'val1', '@language': 'en' },
                { '@value': 'val2', '@language': 'es' }
            ]);
            r.addingValues = store.lode.addingValues;
            r.addingValuesLen = r.addingValues.length;

            // addToAddingValues
            store.lode.addToAddingValues( { '@value': 'val3', '@language': 'fr' });
            r.addedValues = store.lode.addingValues;
            r.addedValuesLen = r.addedValues.length;

            // removeAddingValueAtIndex - sets state marker, does NOT splice
            store.lode.removeAddingValueAtIndex( 0);
            r.removeIdx = store.lode.removeAddingValueAtIndex;
            r.afterRemoveLen = store.lode.addingValues.length; // still 3

            // Clean up
            store.lode.setAddingValues( []);

            // competencySearchModalOpen
            store.lode.setCompetencySearchModalOpen( true);
            r.searchModalOpen = store.lode.competencySearchModalOpen;
            store.lode.setCompetencySearchModalOpen( false);

            // copyOrLink
            store.lode.setCopyOrLink( true);
            r.copyOrLink = store.lode.copyOrLink;
            store.lode.setCopyOrLink( false);

            // searchType
            store.lode.setSearchType( 'Competency');
            r.searchType = store.lode.searchType;
            store.lode.setSearchType( null);

            // incrementNumPropertyComponents / decrementNumPropertyComponents
            store.lode.incrementNumPropertyComponents( 'thing-1');
            r.numIncrement1 = store.lode.numPropertyComponentsVisible['thing-1'];
            store.lode.incrementNumPropertyComponents( 'thing-1');
            r.numIncrement2 = store.lode.numPropertyComponentsVisible['thing-1'];
            store.lode.decrementNumPropertyComponents( 'thing-1');
            r.numDecrement = store.lode.numPropertyComponentsVisible['thing-1'];
            store.lode.decrementNumPropertyComponents( 'thing-1');

            // setSchemata expects { id: string, obj: array }
            const schemaPayload = {
                id: 'schema:Thing',
                obj: [{ '@id': 'http://schema.org/name', 'http://schema.org/domainIncludes': [{ '@id': 'schema:Thing' }] }]
            };
            store.lode.setSchemata( schemaPayload);
            r.schemata = store.lode.schemata['schema:Thing'];

            // setEmptySchemataLookup — test with separate key
            store.lode.setEmptySchemataLookup( { id: 'schema:Empty' });
            r.emptySchemata = store.lode.schemataLookup['schema:Empty'];

            // setSchemataLookup requires schemataLookup[id] to exist first
            store.lode.setEmptySchemataLookup( { id: 'schema:Thing' });
            store.lode.setSchemataLookup( { index: 0, schema: schemaPayload });
            r.schemataLookup = store.lode.schemataLookup['schema:Thing']['http://schema.org/name'];

            // setObjectModel expects { type: { '@id': string }, val: object }
            store.lode.setObjectModel( { type: { '@id': 'http://schema.org/Person' }, val: { label: 'Person' } });
            r.objectModel = store.lode.objectModel['http://schema.org/Person'];

            // rawSchemata expects { id: string, obj: object }
            store.lode.setRawSchemata( { id: 'testCtx', obj: { '@context': {} } });
            r.rawSchemata = store.lode.rawSchemata['testCtx'];

            return r;
        });

        expect(result).toBeTruthy();
        expect(result.addingValuesLen).toBe(2);
        expect(result.addedValuesLen).toBe(3);
        expect(result.afterRemoveLen).toBe(3);
        expect(result.removeIdx).toBe(0);
        expect(result.searchModalOpen).toBe(true);
        expect(result.copyOrLink).toBe(true);
        expect(result.searchType).toBe('Competency');
        expect(result.numIncrement1).toBe(1);
        expect(result.numIncrement2).toBe(2);
        expect(result.numDecrement).toBe(1);
        expect(result.schemataLookup).toBeTruthy();
        expect(result.emptySchemata).toEqual({});
        expect(result.objectModel).toEqual({ label: 'Person' });
        expect(result.rawSchemata).toEqual({ '@context': {} });
    });
});
