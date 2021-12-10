/* eslint-disable */

import {shallowMount, createLocalVue} from '@vue/test-utils';
import AssertionTimeline from '@/lode/components/AssertionTimeline.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('assertion-timeline', () => {
    let store;
    let mutations;
    let state;
    let getters;

    beforeEach(() => {
        jest.restoreAllMocks();
        
        state = {
            assertions: []
        };

        mutations = {
            framework: jest.fn(),
            organization: jest.fn(),
            selectedCompetency: jest.fn(),
            defaultLanguage: jest.fn(),
            webSocketBackoffIncrease: jest.fn(),
            private: jest.fn(),
            selectCompetencyRelation: jest.fn(),
            selectingCompetencies: jest.fn(),
            newCompetency: jest.fn(),
            t3Profile: jest.fn(),
            changedObject: jest.fn(),
            loggedOnPerson: jest.fn()
        };

        getters = {
            assertions: function() {
                return state.assertions;
            }
        }

        store = new Vuex.Store({
            modules: {
                editor: {
                    namespaced: true,
                    mutations,
                    getters,
                    state
                }
            }
        });
    });

    it('Renders Assertion Timeline loading page when AssertionTimeline.vue is mounted without assertions', () => {
        state.assertions = undefined;
        const wrapper = shallowMount(AssertionTimeline, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                };
            }
        });
        let thing = wrapper.find('#loadingAssertionTimeline');
        expect(thing.exists()).toBe(true);
    });

    it('Renders Assertion Timeline page when AssertionTimeline.vue is mounted with assertions', () => {
        const wrapper = shallowMount(AssertionTimeline, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                };
            }
        });
        let thing = wrapper.find('.timeline');
        expect(thing.exists()).toBe(true);
    })

    it('Renders no assertions message when assertions array is empty', () => {
        const wrapper = shallowMount(AssertionTimeline, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                };
            }
        });
        let thing = wrapper.find('#noAssertionsMessage');
        expect(thing.exists()).toBe(true);
    })

    it('Does not render noo assertions message when there are assertions', () => {
        state.assertions = [{
            "context": "https://schema.cassproject.org/0.4",
            "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393851023",
            "type": "Assertion",
            "agent": {
                "context": "https://schema.cassproject.org/kbac/0.4",
                "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393850890",
                "type": "EncryptedValue",
                "owner": [
                    "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                ],
                "payload": "+Kt6IG6CG59dzMpVImJeKCubFyIP2s5gHlUOoqeFIkIMK2w5MUqiggj/AhYQKyDN+XuT3ntDfVVWIbsISLrR7RNYDvT/WdYPFXWZkXRB3ZhusOiYihEc/DpykoFvsK9MsLNf4Q3M+mP6PoJPfmrJDvcn/JKnr00r6D/VeeP0pjjS/6PXHLG5tHhkBwAdrc3vKLo2lLjRXljp2bR1FTLWcQOgohmkR7PyhqOXxvtbpyMXA/6PgRxGOXBwkYObnKTPoqMuIkm9X2Xhu+akxMeFk00AVGUbWQSI0G86klXEmr6Npen1UdGh9ACNSZzRqZPXNzaWXZvn8rMOCwcvrqcUNsVUjhGzoIgAhSGLkTEXCkO1IiCq2BrquL/PLBv1OjlXVeGWvWSKOnz9Gk/iZT2G/oZllyDCq5svaiRYk+viszsgDe6gesSqstNEc9flece1WlF2me5cumTno185G55buNraWNa/pBDewAKdPrN9GcbVhjPoj/CbfHDbLjGe+DtnijiwU3/GPWqhfVU64ZyNWE64l+WWtHAh2o7qgvpcmHeVWFQCeKri+Zri2CSnj64aFubWbEdEFURUKA==",
                "reader": [
                    "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                ],
                "secret": [
                    "hic1vUhYahSDPxPlGvOSRUyvJrYn75/SXY8/W7hw21ItSJ4DYQsyNlmp7VIclwrYLrzBfM4aYbgpDh9TU4Op0upmx7P6EMGeE7e84qznpgOvAlPCif61ekVVgbcevMggnMOg8HjEithCYOVXw+6E9Y5ilZLKPhONYf+BWwe3ffvbyrpwzWKztuy5vu2ixvQ4qm+muEpC4m3FxCCQv0xuBkpP+ANBTBIZKa+9mKBlqUiO0BRwfPWElNPWZxZAjQWKyBRCtFPYNcU9e6MUBU7/hotCp8JC8pUhxqN0bJZZeQB4I9qJTBJbY+oZ8nevdQBWfy4a76VkALt+fL1yPkErjQ==",
                    "ca4jEc3zxWyp/LQwrggAhb5qDQdhIaA76616neGGn85nDC4H5Kv8zRZxZV1vccgnICOm4xjbORmC3hosrqgdhYWMpeVjmiD6PEt6PPFV0GAGCcwEsjfx/R4r2te+/CcCw+Cr5mWsNdBUyUOj/yyOMyOw9RvXvUN/PlTsmutEX0AazjZycs/UyBJhbSpw8200bGS2CdfY/mayRYuxZoED2X1iYzciUePsdsUJ8g4twOntz3qvWDbUwNSYx1kVHkmi78LvjRyFAppMpj8B+8+yRWUz55xtoncjdPD9xMaKrSfuu1RTSmTrvAtLl6IveoyvE9pVYZP6gL6TEf+KAnNlzg=="
                ]
            },
            "assertionDate": {
                "context": "https://schema.cassproject.org/kbac/0.4",
                "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393850890",
                "type": "EncryptedValue",
                "owner": [
                    "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                ],
                "payload": "bMSeFc8vDG2ftCOdqA==",
                "reader": [
                    "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                ],
                "secret": [
                    "cqkUyNkXNIO0Oq1ltBKZrIqeoXEJD3KchI7CsPqSDieQR3Pk7UNisNRSIkdgQG7+O0abgVOLEC5GcyexiX5VgyrkSUIFTmNl5PiO+uBedldCL3b1f6Pv/sBl8IoiAKiFAWPuJDtyrbJWVajWy/7RwZClbLh7YQRs+1VWhM1pcNjvSF3VXftxkswhqJyV6XOyYEchkBlXSVEdesp29CHlfe6lg2LfO8/O9Vh/7jUM/AOp2neWSfPbHx9Ftm9imbn5Nk/yqDykfU9OlE4ZVKNFLM0BTJSclOT8rcMzPWviEx4iJ5d7LJK7IFzbBguIsszFxwEdpk46JDiG2rJvUU7ABA==",
                    "ELnda5LkWm1whxVTbWryClcKx1HFZyWvx3ywK8o+FfoBmeJX+jU+D65sNKNmyExbHqTzYwq/jV/9Q8Qbprwc/2QrouJSidjEf19o7EuxFC57KmdlwAjN7zVUGWY4RPVgqoa0V6WMmwF7dhedopsGPfIX3LoUZkbvFiOOmpPat9kESK+NtQ4rNeNgaTj0rZp7L8VYBMmfZfjOZsh1f5IoEqLlyGHJ+eIHld9kBTKKmQHIDNAh1ehBa+pyXOtx/fLUTUBhcRfhSqnDiugyK1pgCbgUuMtzs5YbfK3qSGImQVZEzeGa5IUDgmoCRvQnRoT9ywjGk7Azohqxp5NnQcrWyQ=="
                ]
            },
            "competency": "http://localhost/api/data/schema.cassproject.org.0.4.Competency/a8ed1bbe-1269-4df0-8e18-87c5472e2911",
            "confidence": 1,
            "expirationDate": {
                "context": "https://schema.cassproject.org/kbac/0.4",
                "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393850890",
                "type": "EncryptedValue",
                "owner": [
                    "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                ],
                "payload": "oSvRZwA65aJPigx2bw==",
                "reader": [
                    "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                ],
                "secret": [
                    "R/0WPsIRJs2iiGuNGELk7LyJ+zLo2b6/Bu8zMH/n5m3kL3Obwt4sXktrmrQIh0Gr+UtighDJ6VAwlVkXryYpzkq663KWpW+x22wSGEU17w1CBRRlKQ0Z4AkTE1f8cEujFuLrixfSddFZB05c3xvdxSPmUvbsv6bfK410fRknLOBJk8AtrqTbC6d+WmTrun7ugY6rzPMuf9DDAkU6KzDiCJtj8QukMusoswU+HEExx7506eVArflVv41nkiq1FjOQ54Q8bm7OPEd+oMDaigELv1uqlnPvEz+/ITuSmx3PYERnASGF9t9wTBdWnza0MCYUFNMZFdoBGz/DmGP+D4WLPQ==",
                    "RCJsqCPE38+a/2DcpRzpkWk/jHJgvSEO+0L8qWwqnuRRHgoIcfiBw6vHAa1BUC+jTz863VqMTNBVIcOjvV+QwYSqTYRe5V/AiK4ccjcLxscKS5vKBipTDEaBauher7CNNPGWY9utmdERK9YwAj3TYG4tXSgY0STFFyuGtDZEZX//tzkKWI19LcEKzACRyi+0GHStIGnNl/xxGVFYBWg7d9nC+sKeZKfMbvRYe3mfYBcP2imKFai4wmfEWVT0DuvFpZGZj0JdKOtOfjlZcL7wx9/ELybA/cJDfehrHdRZTy4qcKP23sZhW04w0t8DPkhwu4XrR5/M2Sl/6cEj6r3f4A=="
                ]
            },
            "negative": {
                "context": "https://schema.cassproject.org/kbac/0.4",
                "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393850890",
                "type": "EncryptedValue",
                "owner": [
                    "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                ],
                "payload": "jbe9pIk=",
                "reader": [
                    "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                ],
                "secret": [
                    "cYYiVr7UGd3wujFSrAK34BTBMhufFCqHYF7r+f87deiPILDnO5xy+kdp6Xrhi1TFcg1GOv7JtVqxauUl11hypYFoVVo/Ka6YRwx2r5PVYQPRLZtIM8SCOwvHjk36KbNOp0qA6B5YHAW9MSNn5UX7xkv8HbxAlAZsr5NkkX71Ovr3mWmUA6bzG2dloIME6Z8Z1WouB/p0rbNcd83beAcslzgdy8t0M/pEsEGbY9uCE8sBw7avx5UBsxhj6TaMVAEiLeenC/WR92r/xnC4PPBOMbZskKT/t9towtM8I43/oVQ/e1zZy28lF4OkcWLls8x/RxcLnk5991J2MKMkRuI1CQ==",
                    "Q4gnpMEfUvondW9gW/egU3ojoZjEhgtv7JQWS48CzWB5M1W7DiMIQXIJiR3FqUSI5PCI6bqZ8ZjXZpGJlC9peO2cpfA3eD8uzKVbHDCg35lI34yCXdkhXeyf+mzNVk1byLbi0ki6M07LT7hS6fJSL/3RxgJl1YIO8GYpIecWsz2JvBi1BrI/RkoMT5QIBdUfXtnfj4KpFnmVdiibR3gehMpG4mlM3fwpx+JCI9acoPtq7egPww1F+nhqteqbPWjidZIsVCoI5pqz+NYw7TsbN8JxeVP+kxtYGyYsbIsMi0WWvoYIrXRaeP+RWANbdIHB4Jn466v7OrdKQ6nxD1QpVw=="
                ]
            },
            "owner": [
                "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
            ],
            "signature": [
                "Mbr/d9i6YYBmTZG4+3hcVpfHvgBDD94xRDuJ7Anb+gJNSfjMzY+s/KFjY4PwYHgJr3utZfUhyelLPwGy8X6Asnyu+xkBk3xm1XrK6mWWrkM1dJEcm9p+tBGRv8xHK3AEnJswtt3vq7iRxMFEZRrmLfBKWwJhr00rmWlYP8QOZkdWDrM6ruK3GLHEsqxrYdjd7rwUM6ZkM9UcGeerbfOAHj3I4Sktp4USOuv6LMQ4HO4O3x8viOk16vDSfXlHdr7pBsh6ubXWI7siPaPOQas+WT7tYPpjV6heXE4R2dl+4QIXqaPCuVtTUvZb4Ad1YXOjSbHE4xh6Fkutb3rDHlViow=="
            ],
            "subject": {
                "context": "https://schema.cassproject.org/kbac/0.4",
                "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393850890",
                "type": "EncryptedValue",
                "owner": [
                    "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                ],
                "payload": "d1McVJ6zvv4g6uqJgP/HxF/uY23MClz/QyrRaN6ilerfYbNrN/wHq6ObBWCxKnmH0KV22NMjle0weP965eu38TT/BZgc/IWHgM7lXldjRtbOuW+OtILu6U7keAvT6NBALdlorLbu+DYyqquhiZ7sbRrofljY8zaviP7wnoD6O/+kKQA76CDIvceafQiEL8wVXhF67GrF+HKG5e0Ha1UZxPAYsUHBhSelS/n5xks664+sQde9OulSztAHjUu8bK6JSZRELdeh+i1lt9ZmhU1mRQKt3K/6EHWwtbPbTQb+hWDZJM0k7JblkWaE6GUVmvPj+QkqIfrxSwdJGLSmANYIZ724G2tgGfoE5H1F4osqO3+YB00pMQsMUbdp2M9h7JEdMmZ7lTg9ESK9UmAbcwqep2aCjl74epUkyfrtYBTbNEo7OtF4nyY0TtW/lyXwjds0oPZuGXl6V+UwZJr5FKSWtg2kS6zAHvHvN4JKU01fIolyL528b4uqk3J5gLb+DcuBhMMCA9C6a3qQg8uCx1ZD6xk0ymOk3aV0b+aHIE1nN6KumvbQEq/q+rqAs5XrE1jVi17thEHu5ybYaw==",
                "reader": [
                    "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                ],
                "secret": [
                    "SRHNyNUMUwetDB4u62/D1LM/AO+IhbDivRd+ILg6sX60dYCtb7pxDBdVWeqqmGmnwFRgV8ZTdrIu/lBQ9JK58isbJVVBVfuxGAJ89gQobc9gRNjQ9Ghk/FeNuPse6gfCqa5+lynwLjhHg3wi5Q2r6YiWo76fmFHxj8g3yJEMV4qTETfvfY8ndo5m8QCH9Tbq9MIbYLCRXVpGS5t5hnFO2FnQ2r8IK0lJzCDuuVo4uJeBDMLuDl9EeEuIODF1DE/RamRf+CGdeiAb9OQ01Lbvix6uTPQsSzWOvzAypH3+Ot9o/4cU2FRLqrjkHiPf9m61YQejKUyk9C78lie8a6OImQ==",
                    "LyENzg1sn2kvTVqLyH9jP2Cg7fV5OU32fXu/BsHbM9tYg2Z+gcpGp5EoXaXpg4+sRKLH/VF95FzB1en2Cg/duLcJyiESqQ03nnYOASTFWk8V0dh1Yk1klYS1mZK4YYZhctRtdggNc4gjPw3SHDUW3Hdu/YGqlCIznDro9h7372yZgNlLicIPkxHQ9caeg24L785++pxPVXcHca/7N3DKcQ8o8tvSUymHG4kwU6HwfbUuzWnWXoxoRnCsAuszoXBE8gopByxCb1RLNY+IJpzNSflZUXoEv/VndCiFRvkwA++vMJoqOyAmwOH3/KmuY+4sM39fXQNJQpjaXqvejfrA6g=="
                ]
            },
            "decayFunction": null,
            "assertionDateDecrypted": 1638393850908
        }]

        const wrapper = shallowMount(AssertionTimeline, {
            localVue,
            store,
            propsData: {
                queryParams: {}
            },
            data() {
                return {
                };
            }
        });
        let thing = wrapper.find('#noAssertionsMessage');
        expect(thing.exists()).toBe(false);
    })
});
