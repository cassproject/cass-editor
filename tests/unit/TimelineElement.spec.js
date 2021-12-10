/* eslint-disable */

import {shallowMount, createLocalVue} from '@vue/test-utils';
import TimelineElement from '@/lode/components/TimelineElement.vue';
import Vuex from 'vuex';
import EcAssertion from 'cassproject/src/org/cass/profile/EcAssertion';
import EcCompetency from 'cassproject/src/org/cass/competency/EcCompetency';

const localVue = createLocalVue();
localVue.use(Vuex);

const positiveAssertionWithEvidence = {
    "context": "https://schema.cassproject.org/0.4",
    "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638470288588",
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
    "assertionDateDecrypted": 1638393850908,
    "competency": "http://localhost/api/data/schema.cassproject.org.0.4.Competency/a8ed1bbe-1269-4df0-8e18-87c5472e2911",
    "confidence": 1,
    "evidence": [
        {
            "context": "https://schema.cassproject.org/kbac/0.4",
            "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393851023",
            "type": "EncryptedValue",
            "owner": [
                "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
            ],
            "payload": "ys27OryhRV6rDWbBgA==",
            "reader": [
                "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
            ],
            "secret": [
                "TzHKGhntyhS8mLW/V9HjeNN0JgsQ2/5NZnqrCdJWetZ0sit3tomk/mOcBH/hGHRT9hVXciq6kP5BR47XTuWS4g6ykTz3Kr2vcW1ODLt3ThIv9re8b1bnRxzgKM59h7TFrSX7c3DYhP3c957UuG5XK8vTn/nc0LgnX/vT+WUTkqlH2DyC3vEE8tYyE86O73MD76Ex+vurxb0GwHCiFNzLErzWwh4mM8sEftRwGPTqMvHuESWuttQs9x55mTUHBO3KqbTa0aEOQBhwfkIDASHd7UWzQfsQrZWjzSK8ivBEerFGVowzhZhvk2fHsizOWjVEJ3IwEI9w7vGBr0mDDtbGMA==",
                "THuKtPBW9SIX99FZJ8czRFWNhIinzgdR+OMLZYQy0u6AugdFxwxotSKYSKte72YfLfPD2q0YbbyK76go4jdy1aaTPG1BEyVX6ldfPP/REWK0Dc309xb4qVatPomvR0O1ZH5PoXLW93MAeEkjdr4orKKXRD41bkCR/0AOVowFftw/FgIqZI72Z8d4y3xCSUqah/tIz9l2if1A4TtmjfMZ7oeF1aA5c8AVHIissxUOetHbbrv7SFuURjNclOnduJNpETBgD04meKitYn7iWrly1Uk34KxgimeChpa5dEk3jnfjhLQlqbJwFzvmmKEL6tAlHYCLm24zw1Cfm78EdV0LEw=="
            ]
        }
    ],
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
        "Pa997n0i28R33RQPuVDpBShPokDwebiGaHD6pNeaVQW2dsbBRP/Vgx74YMlOfCb80yQJ4lcl0/gbi1FYuHEZW1u89fZvBQk/ZIFb/N+Y7PrEaZQ7j8z8MwanIdcHY68dsduIfNhF5boLyW/Hc5jEr3xLFnoi8kz05UdJi2CAYp+MFFdRVatlloOcOsYQhAZOmng6GTmObMDc/wD6YljfPnYhKm+tb1BKZVdsa5bOgDvbfnd9Ili+mIVMf0djBnNKvNYIP9/YD2oyUtgcm5zkm5bColoOMzTVHIYtncetXaPvjeyUrvp/G+lsFd+1Rd3KIrApigrBfFIZqRY41EpMaQ=="
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
    "decayFunction": null
}

const negativeAssertionWithEvidence = {
    "context": "https://schema.cassproject.org/0.4",
    "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/98a853e8-d486-413e-bd8f-34ba22faeb00/1638470259757",
    "type": "Assertion",
    "agent": {
        "context": "https://schema.cassproject.org/kbac/0.4",
        "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/98a853e8-d486-413e-bd8f-34ba22faeb00/1638393936148",
        "type": "EncryptedValue",
        "owner": [
            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
        ],
        "payload": "AGOU5PRr9weEOIUm5uBGMsFL7kZgK9+X6KJkiy9daaCLJsN4SziZC0EVNNZRzrp9eBZ5z18yh4m5bnBH8y7MM4XcHCfdqBGxZCzuOom0EA8QcZW86QO26ajs0+mGVR3I/eMbGAGjhQaTz1jwkf3I53hiwROGQnfIEvsuZR23L4gfUwwuoo+hskyy7e7FTsTUchB03MPjpUGFWOxobrOfpdx6a9Kf3F5dHJLOKA9pruPSxZn108RT3ItC+h7+45ucFLFxZ6CrJlHJbRvUqlWilFMpGojyaokXFdWDueCyj+4cciyX7FNEciPywz7HuIXIyfiH9t0YRyC6TKbW+OeK8rg64iAVrFho+1zcrzbHdZz9e4PI7Lr9p9isRH1cuR2jhAFKOl8Jigz4AMKHa/APPcElu0zRiATIbIcXYkjDFKkjsmt0WYLYa9wCKWOYcCfdZa15hKQtqs61U8kQENwLn2yB9ygWi2P3OxUQHO69IW5dywZ+e09RRC+slHBMWgkAVrVFVGIoXMLyEIp57qfQFf/UdQ52QLhpE+vKBbChbpOZEUGl4MNnc7ombEuCC370lO/Ibx64ZssNtg==",
        "reader": [
            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
        ],
        "secret": [
            "G2uipaYlT3GSfeJmNL91k3ftCIAQk8L2FkKlp0+y+njNg1rCXL6NtZcBeUw+Du8Wq+nA+APBeSNiplQ6iWm9lD4uSyPDxPd8ynIG5Y+v2sj94JQxLnGZYxJ2UBH0k8KM5pMz7IkatTViQ0Uuy1eNkT7ikiGoeOOo09Ww3emUfNICeseRqrgpngI/NdXIxzKZ0LMQNxTe7bDAIlqkPv4Q717NQg1deShv5yW6M8usvdfIV0XfOBRRxLaL5EpNYZ5X7z5lxq8AYMi58nhUK8MxlNekXynGRafcjpXPoD7HVVCUHWnnUi6dbVHEvHtPsFrlZ0fFOvGFAPUgLGqgE6bVmg==",
            "VOa22VyIcGja5HLVb79MliAWZIMczjZ9HHtlqiP8CreCkAnYKXxYBmaXYPZZXSEl6gRaNMyLMghDW79P5pAyfYbKL93FGDn3G436HIxSxkJSb1s61xZQLLs4GFZDyfvbbPDzlsibi/RxunaSSrIwDvmjTxLOR2qPG10Gm7q3SGfIIHgxyqeGbmBU2F/hEb4s/HSnrtWnuxqNKNUqH+lc26kdI+M7KNcSdOmNkYUJ4e5EGkm53gZqISwmEYlIMBUvchYDAHi/1kEW4gaADXHD1FBqBR9deHciElY8LTJGuRMkSMiHHhmqWVzMg5TcW8bqbQQ4Kyu8Qo7fh8mhrVzBsA=="
        ]
    },
    "assertionDate": {
        "context": "https://schema.cassproject.org/kbac/0.4",
        "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/98a853e8-d486-413e-bd8f-34ba22faeb00/1638393936148",
        "type": "EncryptedValue",
        "owner": [
            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
        ],
        "payload": "p+l1zVFIcO3ZCiwGUA==",
        "reader": [
            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
        ],
        "secret": [
            "W1HjMM6Brgc65Nq0YUhhjwSS2yKoF17HWfZ9zNK0y9m/q55I/tq/4RX6KxmT/WXXVbm923S23r6sSZBCElO/sIIRuuOmvtJ6T6v+eLmsg6VoEfeReiUKyRWQ3uDJWMW9H5D751RUnmWSTrWC66D5x6JUNs/58kmQavkZBK3ZzPWgP76xu6KomLmAcxxtf+1QJZ/CVAc0RpZrfpwPq5wmPA/w7TODWGurq8RnoJHF78eG+PO9iGJf9KqkoSh6TBXkEl6Ew0gOTFYuIX6ZdKi3ef2pSDbQIuNv4HtNA53/Fo6wFcKHRE5v/5YGtX4FKXfDjKXg9r1Twtfcc4UokLy4gg==",
            "YcDP++SQjhgIFXudSU9r2ELt9mFXFZmKq8payaGvbIpCnqDEKYRjGcqxbKwyDFmkMGMc5wknxSGVdc37BcGQSddx9Vw9MVugVgy3WdfqNccWXaN7GljWbLvQnPYFR7dNGTZ2hVK1Zq1jzgifUBiTeDxHy31fgGcmMgBkZIHLc6tdIflywiKZLp6F9qQDeyA2W9LvVCDbueJ8rLKyTz+yQRJCAibPrqvSb9asN4dPfqdLXXZ6amvF5I3TwtcVcqq/5UKDloKwBmN3usm8JYcGMOGGdjpYyaoSZqt6dbPGBk1XslNd0O1WxiNP95kUTKj/W70pZQ75rpJ6FmvNGOJAWg=="
        ]
    },
    "assertionDateDecrypted": 1638393936154,
    "competency": "http://localhost/api/data/schema.cassproject.org.0.4.Competency/eef2c536-dbe5-463a-b5c3-68e10870e201",
    "confidence": 1,
    "evidence": [
        {
            "context": "https://schema.cassproject.org/kbac/0.4",
            "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/98a853e8-d486-413e-bd8f-34ba22faeb00/1638393936186",
            "type": "EncryptedValue",
            "owner": [
                "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
            ],
            "payload": "usrVoH8JeO7Yroql0FrweQE=",
            "reader": [
                "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
            ],
            "secret": [
                "ZXdq1cD14useXyT/3vGzJXHX7eihoghvO/BXSiJCAlz/jCqunqurd9PlgPekHkPfjGU4/jYb9N5HT79/0+rlwrdWRoUuIDuSrZC1C58MjwLbdRcPaj/VYiviu/qmoB8JT+daiTW8POh9sWzPx0BwLHyvFV1N3ll4EWmK59PBHFJDb5CmEBoaxZ54MrvREd/oz/jH9mvIQPHecTj+HyHezajyoKid7mKCeYLHBdtC4HyQTbprB4PygeDv3gv+lmfMwRiQwNkwDFxCfr82fXVuQQ6Q7Av30V+glEkKTz4GnQIKovZXxDC6QvTTe8QBI519KvEKAB9LF3mKlHMsD5RqYw==",
                "hvX8KSDF9Bhebdv07dDVdtgMx//kvTQ15iRvZuLPoYT+HtKllOd5QToitELn7wB7IAWwoz/P1DiZanyAspWizDFv8ht2bmYL1x+PNsLAXcwkS51Ww6w42/joaJzgbgNxtzhr+Ys8kY7gSfc0og8n7lEleRlxASGvelDyeDQp9zxcg88aJ53oKoEDu7tCIaFQ1QaQkNp3Q415j3bN84089CWFZHCz6KaY4+Uy84o7F/QjMWFrETdJkIXn1aadhC/0s7s6CKq6KIutvVCKg4v6PTpERuUeWH0ZZgdkrli3qD5m0VCn4U6ueFtmSIG95xRkI5qmExKij5xXM8DdAZqJ+w=="
            ]
        }
    ],
    "expirationDate": {
        "context": "https://schema.cassproject.org/kbac/0.4",
        "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/98a853e8-d486-413e-bd8f-34ba22faeb00/1638393936148",
        "type": "EncryptedValue",
        "owner": [
            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
        ],
        "payload": "UiaiiWK8E4LonWvYxA==",
        "reader": [
            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
        ],
        "secret": [
            "a02ycc15cWofFMeLidOs9hEEsPvwcfQNhcD7kHSZrd72tEiDyvWd16smLRnQkUOsRotacZg7NxShkU99aontQ1kagCzzh+mWpSJPEvQBOc8ogpPpPU7z/6IZyjsOXrDPILJeu0y4S9R4vb/7i4coitYeSNpzJctN5OBlXv+fUjWc2yt7/3pDbJTtLleqVp3L20FXWlj29jIEAj8H/WnrCqckLVAAfdmjGYH2sd+kVVBjmzWWZB/SV60fHPOWNkpOgJg+YyyOqTpsTJkIp0mVOUdZdqwrfust6ZkkNMyBal+KtxqAzOYWxI3JUuEW6HwmDAqJaO3lbe39kBBfgn0l4Q==",
            "dZ+T06B/uGt0ml+2XmIQoKh+Z0dPFk9dd4EBeQaXWk95MGDpTLy05mDLvcNoALKRWE3C2uH1kRVT8HeY6RquSI0OdCkDIopkOdM+C9/ASBU6d05HM3PGpHTMp5iMvx/7kKcHsruxOWT+ChsUH0jFgNZk9IwzDm/OI+Cg6z1i4rG8VVItT1Rubrp6v6AHsnsCQLmJ+bnfhUoQJ2gqk1H1d9jGjXmHiAcdR7SlEjTScx0uxY/EsSX2By25RIraF/pJb91LQ41Tfa7fdqKWT9X//FJybT0U5fr1Do25pu3BTpR/cnVx0pfr48VINVcnn5kQs3nZALHkxpDcIPi62Z9Oog=="
        ]
    },
    "negative": {
        "context": "https://schema.cassproject.org/kbac/0.4",
        "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/98a853e8-d486-413e-bd8f-34ba22faeb00/1638393936148",
        "type": "EncryptedValue",
        "owner": [
            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
        ],
        "payload": "jvCieQ==",
        "reader": [
            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
        ],
        "secret": [
            "eMIW/Za43sKcXKxk/sqsE87htSI5BuiVfepH+MySGABClVNU+kiI/j4cYxEvl3S5IvneLIMW/WtM26t5TQ0Rd1e3He4i21+3uhb81ZGGSiVemLYQQP4lD6OhQ/slOj/FTm4xEMU7kNgV2OB5GJRxkwMfjHdE6mknWkrj0m0DjR5b5WBjSPif1KvqLu6o32SXOMyqg4CER7SNg0/NKGVlEZhF5TRDtas7lD2KwY4U1NyYezb1DPVSF3TieG2983RvSwaX3x1qWOrVWNVB0yyZB4CZRwwwfU1jBzoXfZ4qX+MZuuFVZ6SzW+Lq3hIrBLE0f8nekjQDRKtSd5LcT4I8TQ==",
            "OKdijN8WmxCrTKX9n0gonARU6mQazXwBBhGkS4ahm9nclQYCYSC7lHDe4HfLQGhQhzeoGQjzWN2g8+EQ2eyEC699Tp4pCmFQGYe6nrZuQUOvePTrev9L/hNcHq0+AyE10m2FGtOhOt3aRRM+430i5v37cHtYFRWTYSqRFpix6BI2h3772P61uaYfnXZGcjZaTLXzMMuetEgduelZiOww+nh7C4rOY+53DqxLpJ5VQPLaoHXkF4CThtEokT8YAfRrZO+VmeBgkuV0Ao7S+YQk5LwDOe7bdKc10WuPpcNO5zH2lrAeqi3OK9QaG5jqyltAQiVqHro0YGXPHr3THDGlxg=="
        ]
    },
    "owner": [
        "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
    ],
    "signature": [
        "DBYIExzgUYH0WURWHg2HV6MFfK1v0kjVm7X5Qc6ZIOygnhCaoBU7WO3QbCVIl4q1zg1Ju6/XsKTxQQPZ0V6pIu0qrbZPMDdngXMh3vrPoP+IBAqPHRn+uMx1OMDo0eyzpv8y6nS33JylqbfUDGIrCpoq5rw4wdJpwVNM4Me9GstvGFEeXTmwqQNaxxPUEDFqDzMVk5QbtrYvvbyFxoAPiuXKYCKw0iHzFLnPphrigGJGxIG00iUjMhRbHW1VA2/bqrxP99C98rXJAf2bJ9G1j2FO4uNgXRxaqxqLySZTAgw/v0GcdP2LJKDx4olm/e9ywUwPe5+v4DFOmFIiwOhSMg=="
    ],
    "subject": {
        "context": "https://schema.cassproject.org/kbac/0.4",
        "id": "http://localhost/api/data/schema.cassproject.org.0.4.Assertion/98a853e8-d486-413e-bd8f-34ba22faeb00/1638393936148",
        "type": "EncryptedValue",
        "owner": [
            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
        ],
        "payload": "hWPSqpHYVX2SSe+r6AMKXW+lAX2MjrAb+NpS6/XEpqY8zYIm67KHgfrqJmhosbRcXEHT11x7ai329uFXs5+YlkqL3dAC900Ep1RhsPx/Xvgqrr1Dn022+FCi0uvMVllSpUPueyypUyQROi+OUiZ5TW44tiuZDNiMiWYxpRbn4W2vd05J+JCaKoQaTz+Q99IUh6MCvGgRNmhCqBJreW8bJcHnZoZ+Gxiwt1wPqztehzfSo1yzf5bGUXkKYQNpjte8kYW0tXlvGdiytSOEF6/+/TF2ymw5dyaqUXV5h4+EwJyBZza87bdbHbBE/TshQeQmaRCTnqm1VXmLKPtxkpnzKCqdbE/FhYP/qU2cY6KmKYM62mHAMOAy3kzZ/ZrdPOVGAeoUxMBEmVIemoZgqyp93k3uCSEe9LjfgYpJxTcxk0gCPkLg+8vT60Wn8Rpvid75Kl6UWhUnb121K9Y9mmJows9TiO27NxDxaiUPDUQh8s/WKj2bi+W0ZxqKJZBvCaxquQZQRVEjFHQ3wAdvUTxIvm3zQLqoS+upDJjIsslFTDf3pPWw6KqLBGuA7CPkWrGkX21L0Pkf+dX9Qw==",
        "reader": [
            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
        ],
        "secret": [
            "LQ1Kd2d7wUuPQ4ib1HbdtbU4Xraov5hLWL3QuijUIxlwuleY/lXmDbuacEWJSsFwb4p2aIsA8exNNPMC+MS3C0WJOmYEYpkEtuR73+SwszRqVGrfB60h4T/Mt8k2d7tosb3ehSC6FM3N4CzDdgx8cigovE59OwbHoMYpe6XOnRad42UK00Cswhat+iZmNjL5ZH8NSrHAkTmJR3ElVSE7u7OTovRed0A/V5V2KO+qXmwbDSCNsdEeqzHodsDMEI260KsFur7Bglv+4LuG9ha00+DjMNUr9ZdCHdSKUPVXoqct36sLwtJo/j52eY9z/kQvmSlPT0DC7vvaZ1/la8kvLQ==",
            "eYFY5qdynfxWgUpqcCPuRQSx9vuQDoDDvF7TZx0k/gMl/MgWdF3xWe9UpNlQIFnpwmGieHJRCvP3UkaLNj2+RNyZ3IsUiWHnCSfW39KzW7b71+wE6+tXzrTpp/p4BZAMKy9sui+ZZoOOn2fG538mAx7Z0a+C9yoxfh0SBCd9x6SDsqd7HL957oZ0HNzkWN9LvTaUitM+8iPN+ouvG+v0TbA7j4VIJQazdHSEZd8S8vbjbseZwBZN7V6ABycyXL8UgU0U3q4SIaTZBYSog5o46Xn4SZiNSQhtNxzClRnRq58nieGNBDIzqAUdlCFZibiPGvJWQvs+ajEoWJ/uiOCg3Q=="
        ]
    },
    "decayFunction": null
}

describe('timeline-element', () => {
    let store;
    let mutations;
    let state;
    let getters;

    beforeEach(() => {

        jest.restoreAllMocks()

        state = {
            assertions: []
        };

        mutations = {

        };

        getters = {

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

    it('Renders a timeline element with positive assertion and evidence', () => {
        const wrapper = shallowMount(TimelineElement, {
            localVue,
            store,
            propsData: {
                uri: 'http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393851023'
            },
            computed: {
                competencyDescription: function() {
                    return null;
                },
                competencyName: function() {
                    return 'New Competency';
                },
                timeAgo: function() {
                    return '11 hours ago'
                }
            },
            data() {
                return {
                    assertion: new EcAssertion(positiveAssertionWithEvidence),
                    subject: 'John Doe',
                    subjectPk: '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----',
                    agentPk: '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----',
                    agent: 'John Doe',
                    timestamp: 1638393850908,
                    expiry: 1669929850916,
                    competency: new EcCompetency({
                        "context": "https://schema.cassproject.org/0.4",
                        "id": "http://localhost/api/data/schema.cassproject.org.0.4.Competency/a8ed1bbe-1269-4df0-8e18-87c5472e2911/1638393835047",
                        "type": "Competency",
                        "name": {
                            "@language": "en-US",
                            "@value": "New Competency"
                        },
                        "owner": [
                            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                        ],
                        "schema:dateCreated": "2021-12-01T21:23:55.001Z",
                        "schema:dateModified": "2021-12-01T21:23:55.001Z",
                        "signature": [
                            "YOJsstnEpfaVA/fwdbrau+e7vY46YJPW5iz+HQKfZtk+Km7xd0cT+yyk/U62zBPpfJTI8mYzeHUAmDtRlg7071aGrN5q1U9eWKWqgvwQbaZm+a7v7r7V/T2higtKd0f3l8EutfKhH8+rvbe6vSv7Xv9d4khGGffXd60ephKTmf0GJllXLPijgrbNIaUcH9FSADZCEK0rFlhyMxYrtiBZ3E1gdwDo8M4hoo5UoAc1ILLv9TO6pHPBkgnBPLxGiMfHcvC3YxlVCA/LGHpMIDBFnE22KaSNAz2LcT8RM4LCG6AFSM/TYr1FYegkbVz/EsVXKt6awW2QdLDliHfuk5xgHA=="
                        ]
                    }),
                    negative: false,
                    agentPerson: {
                        "context": "http://schema.org/",
                        "id": "http://localhost/api/data/schema.org.Person/aa2aaba4d886f96aaef9cfd3630b028d/1638393825137",
                        "type": "Person",
                        "email": "johndoe@jd.org",
                        "name": "John Doe",
                        "owner": [
                            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                        ],
                        "signature": [
                            "h2Katm+yEICQa7f1WxJLM2jJYTRAdXPKqin40uPzU733ebmAiMce45yxqNvnQvhUIGA1WNmSkaG2mRuASQJZr6eFZ3Sk1OqIen9zTAYoQRXgIJ2oaIOtTIhzE+irohKVXsJmUJFJjX5kVVWyrj0oSFiYp17XiIsIPyo0XlyflTrWftlVvRMAXeLxHk+QstvZJDhMrRGoivW5R75FqZ5CbqyW5f6BmQ8qoY9YeJJEZfNUPcKKf9yWMNc4e0TiJGXg7g/cERirKAvl1JJLkShHfM2y0pc/Fy28PAbhUa6yHDn23uvIuf/T0CHmIZqJTvX3dN/8LeAuCSt4JDPnOtXChQ=="
                        ]
                    },
                    subjectPerson: {
                        "context": "http://schema.org/",
                        "id": "http://localhost/api/data/schema.org.Person/aa2aaba4d886f96aaef9cfd3630b028d/1638393825137",
                        "type": "Person",
                        "email": "johndoe@jd.org",
                        "name": "John Doe",
                        "owner": [
                            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                        ],
                        "signature": [
                            "h2Katm+yEICQa7f1WxJLM2jJYTRAdXPKqin40uPzU733ebmAiMce45yxqNvnQvhUIGA1WNmSkaG2mRuASQJZr6eFZ3Sk1OqIen9zTAYoQRXgIJ2oaIOtTIhzE+irohKVXsJmUJFJjX5kVVWyrj0oSFiYp17XiIsIPyo0XlyflTrWftlVvRMAXeLxHk+QstvZJDhMrRGoivW5R75FqZ5CbqyW5f6BmQ8qoY9YeJJEZfNUPcKKf9yWMNc4e0TiJGXg7g/cERirKAvl1JJLkShHfM2y0pc/Fy28PAbhUa6yHDn23uvIuf/T0CHmIZqJTvX3dN/8LeAuCSt4JDPnOtXChQ=="
                        ]
                    },
                    evidence: [
                        "I know how to"
                    ],
                    evidenceExplanation: [
                        {
                            "text": "\"I know how to\"",
                            "original": "I know how to"
                        }
                    ]
                };
            }
        });
        let thing = wrapper.find('.timelineElement');
        expect(thing.exists()).toBe(true);
        expect(wrapper.find('.assertionTimelineIcon.positive').exists()).toBe(true);
        expect(wrapper.find('.agentName').text()).toBe('John Doe');
        expect(wrapper.find('.subjectName').text()).toBe('John Doe');
        expect(wrapper.find('.positiveClaim').text()).toBe('could');
        expect(wrapper.find('.competencyLink').text()).toBe('New Competency');
        expect(wrapper.find('.evidenceText').text()).toContain("I know how to");
    });

    it('Renders a timeline element with negative assertion and evidence', () => {
        const wrapper = shallowMount(TimelineElement, {
            localVue,
            store,
            propsData: {
                uri: 'http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393851023'
            },
            computed: {
                competencyDescription: function() {
                    return null;
                },
                competencyName: function() {
                    return 'New Competency 2';
                },
                timeAgo: function() {
                    return '11 hours ago'
                }
            },
            data() {
                return {
                    assertion: new EcAssertion(positiveAssertionWithEvidence),
                    subject: 'John Doe',
                    subjectPk: '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----',
                    agentPk: '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----',
                    agent: 'John Doe',
                    timestamp: 1638393850908,
                    expiry: 1669929850916,
                    competency: new EcCompetency({
                        "context": "https://schema.cassproject.org/0.4",
                        "id": "http://localhost/api/data/schema.cassproject.org.0.4.Competency/eef2c536-dbe5-463a-b5c3-68e10870e201/1638393934477",
                        "type": "Competency",
                        "name": {
                            "@language": "en-us",
                            "@value": "New Competency 2"
                        },
                        "owner": [
                            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                        ],
                        "schema:dateCreated": "2021-12-01T21:25:32.508Z",
                        "schema:dateModified": "2021-12-01T21:25:34.453Z",
                        "signature": [
                            "EPVnkslWFLPWGHP1qe9rZGLM3N9EJfYXMsIHXKHjtd2+mZ6i5H1hyZrMmLRlTj5JSpa3ELRc/kRgFP1vcP6FvjR4eLBTtUsXPia7pllQL3xgPtrzFNJ5yZTulLnGVDYYq3nr/9VPt3YfQRkloEFUt1oM1PGuaixB7GpnEW+D3i8QqoexZh3Tu/spYsQJTw8HEsQpP63VLg9EW+FfCB6ispWZe6TQFJ/P70h5MFuV/5S5SGL5E0y9ZOwqXMCHkwd4ttPDLLAWSfrHanXc1akzucRCIHsUYS0labkMUkRWgQ5rn+tChIIx98yjBjLgF6c4C9jRzUO2U6oyMjM98gwLaw=="
                        ]
                    }),
                    negative: true,
                    agentPerson: {
                        "context": "http://schema.org/",
                        "id": "http://localhost/api/data/schema.org.Person/aa2aaba4d886f96aaef9cfd3630b028d/1638393825137",
                        "type": "Person",
                        "email": "johndoe@jd.org",
                        "name": "John Doe",
                        "owner": [
                            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                        ],
                        "signature": [
                            "h2Katm+yEICQa7f1WxJLM2jJYTRAdXPKqin40uPzU733ebmAiMce45yxqNvnQvhUIGA1WNmSkaG2mRuASQJZr6eFZ3Sk1OqIen9zTAYoQRXgIJ2oaIOtTIhzE+irohKVXsJmUJFJjX5kVVWyrj0oSFiYp17XiIsIPyo0XlyflTrWftlVvRMAXeLxHk+QstvZJDhMrRGoivW5R75FqZ5CbqyW5f6BmQ8qoY9YeJJEZfNUPcKKf9yWMNc4e0TiJGXg7g/cERirKAvl1JJLkShHfM2y0pc/Fy28PAbhUa6yHDn23uvIuf/T0CHmIZqJTvX3dN/8LeAuCSt4JDPnOtXChQ=="
                        ]
                    },
                    subjectPerson: {
                        "context": "http://schema.org/",
                        "id": "http://localhost/api/data/schema.org.Person/aa2aaba4d886f96aaef9cfd3630b028d/1638393825137",
                        "type": "Person",
                        "email": "johndoe@jd.org",
                        "name": "John Doe",
                        "owner": [
                            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                        ],
                        "signature": [
                            "h2Katm+yEICQa7f1WxJLM2jJYTRAdXPKqin40uPzU733ebmAiMce45yxqNvnQvhUIGA1WNmSkaG2mRuASQJZr6eFZ3Sk1OqIen9zTAYoQRXgIJ2oaIOtTIhzE+irohKVXsJmUJFJjX5kVVWyrj0oSFiYp17XiIsIPyo0XlyflTrWftlVvRMAXeLxHk+QstvZJDhMrRGoivW5R75FqZ5CbqyW5f6BmQ8qoY9YeJJEZfNUPcKKf9yWMNc4e0TiJGXg7g/cERirKAvl1JJLkShHfM2y0pc/Fy28PAbhUa6yHDn23uvIuf/T0CHmIZqJTvX3dN/8LeAuCSt4JDPnOtXChQ=="
                        ]
                    },
                    evidence: [
                        "don't know how to"
                    ],
                    evidenceExplanation: [
                        {
                            "text": "\"don't know how to\"",
                            "original": "don't know how to"
                        }
                    ]
                };
            }
        });
        let thing = wrapper.find('.timelineElement');
        expect(thing.exists()).toBe(true);
        expect(wrapper.find('.assertionTimelineIcon.negative').exists()).toBe(true);
        expect(wrapper.find('.agentName').text()).toBe('John Doe');
        expect(wrapper.find('.subjectName').text()).toBe('John Doe');
        expect(wrapper.find('.negativeClaim').text()).toBe('could not');
        expect(wrapper.find('.competencyLink').text()).toBe('New Competency 2');
        expect(wrapper.find('.evidenceText').text()).toContain("don't know how to");
    });

    it('Initializes the assertion', () => {
        let getAssertion = jest.spyOn(TimelineElement.methods, 'getAssertion').mockReturnValue({});
        const wrapper = shallowMount(TimelineElement, {
            localVue,
            store,
            propsData: {
                uri: 'http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393851023'
            }
        });
        wrapper.vm.initialize(true);
        expect(getAssertion).toHaveBeenCalledWith(true, undefined);
    });

    it('opens the competency when the competency link is clicked', async () => {
        let goToCompetency = jest.spyOn(TimelineElement.methods, 'gotoCompetency').mockReturnValue({});
        const wrapper = shallowMount(TimelineElement, {
            localVue,
            store,
            propsData: {
                uri: 'http://localhost/api/data/schema.cassproject.org.0.4.Assertion/6732779e-bc85-4163-86c7-c02463fdf777/1638393851023'
            },
            computed: {
                competencyDescription: function() {
                    return null;
                },
                competencyName: function() {
                    return 'New Competency';
                },
                timeAgo: function() {
                    return '11 hours ago'
                }
            },
            data() {
                return {
                    assertion: new EcAssertion(positiveAssertionWithEvidence),
                    subject: 'John Doe',
                    subjectPk: '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----',
                    agentPk: '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----',
                    agent: 'John Doe',
                    timestamp: 1638393850908,
                    expiry: 1669929850916,
                    competency: new EcCompetency({
                        "context": "https://schema.cassproject.org/0.4",
                        "id": "http://localhost/api/data/schema.cassproject.org.0.4.Competency/a8ed1bbe-1269-4df0-8e18-87c5472e2911/1638393835047",
                        "type": "Competency",
                        "name": {
                            "@language": "en-US",
                            "@value": "New Competency"
                        },
                        "owner": [
                            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                        ],
                        "schema:dateCreated": "2021-12-01T21:23:55.001Z",
                        "schema:dateModified": "2021-12-01T21:23:55.001Z",
                        "signature": [
                            "YOJsstnEpfaVA/fwdbrau+e7vY46YJPW5iz+HQKfZtk+Km7xd0cT+yyk/U62zBPpfJTI8mYzeHUAmDtRlg7071aGrN5q1U9eWKWqgvwQbaZm+a7v7r7V/T2higtKd0f3l8EutfKhH8+rvbe6vSv7Xv9d4khGGffXd60ephKTmf0GJllXLPijgrbNIaUcH9FSADZCEK0rFlhyMxYrtiBZ3E1gdwDo8M4hoo5UoAc1ILLv9TO6pHPBkgnBPLxGiMfHcvC3YxlVCA/LGHpMIDBFnE22KaSNAz2LcT8RM4LCG6AFSM/TYr1FYegkbVz/EsVXKt6awW2QdLDliHfuk5xgHA=="
                        ]
                    }),
                    negative: false,
                    agentPerson: {
                        "context": "http://schema.org/",
                        "id": "http://localhost/api/data/schema.org.Person/aa2aaba4d886f96aaef9cfd3630b028d/1638393825137",
                        "type": "Person",
                        "email": "johndoe@jd.org",
                        "name": "John Doe",
                        "owner": [
                            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                        ],
                        "signature": [
                            "h2Katm+yEICQa7f1WxJLM2jJYTRAdXPKqin40uPzU733ebmAiMce45yxqNvnQvhUIGA1WNmSkaG2mRuASQJZr6eFZ3Sk1OqIen9zTAYoQRXgIJ2oaIOtTIhzE+irohKVXsJmUJFJjX5kVVWyrj0oSFiYp17XiIsIPyo0XlyflTrWftlVvRMAXeLxHk+QstvZJDhMrRGoivW5R75FqZ5CbqyW5f6BmQ8qoY9YeJJEZfNUPcKKf9yWMNc4e0TiJGXg7g/cERirKAvl1JJLkShHfM2y0pc/Fy28PAbhUa6yHDn23uvIuf/T0CHmIZqJTvX3dN/8LeAuCSt4JDPnOtXChQ=="
                        ]
                    },
                    subjectPerson: {
                        "context": "http://schema.org/",
                        "id": "http://localhost/api/data/schema.org.Person/aa2aaba4d886f96aaef9cfd3630b028d/1638393825137",
                        "type": "Person",
                        "email": "johndoe@jd.org",
                        "name": "John Doe",
                        "owner": [
                            "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkNqW7emdb2hwZK060cjUJ8HCwktTOuBYSMQ6K+9Fe9jt3hGTeAkTrOS8ZKZHXs4SZl9N28kdr+dwgys8FRrzBKm+HUEQYF4pdk526Old8BFpWoQHQF9TtcOms00fOwQRC6WF2PhMc/Wi+a/dqrh2FsyJNbXlkVv9KafPm0z48yWeprvPlV4xxyprUJdk7Gpu0UnnynebARkr5f7B3cZ7P9v8+xUYUORUwEoxRMRC+lDN8yMYQfvlx299aQDPyn2tRDQNoeeaVWC8utWNirlBUpToxTf6rBSbLOGy5O/raY+g7HEx/P0Jwy9dQJEKl3Lbf283vN+HvWG7epBDhGOpRQIDAQAB-----END PUBLIC KEY-----"
                        ],
                        "signature": [
                            "h2Katm+yEICQa7f1WxJLM2jJYTRAdXPKqin40uPzU733ebmAiMce45yxqNvnQvhUIGA1WNmSkaG2mRuASQJZr6eFZ3Sk1OqIen9zTAYoQRXgIJ2oaIOtTIhzE+irohKVXsJmUJFJjX5kVVWyrj0oSFiYp17XiIsIPyo0XlyflTrWftlVvRMAXeLxHk+QstvZJDhMrRGoivW5R75FqZ5CbqyW5f6BmQ8qoY9YeJJEZfNUPcKKf9yWMNc4e0TiJGXg7g/cERirKAvl1JJLkShHfM2y0pc/Fy28PAbhUa6yHDn23uvIuf/T0CHmIZqJTvX3dN/8LeAuCSt4JDPnOtXChQ=="
                        ]
                    },
                    evidence: [
                        "I know how to"
                    ],
                    evidenceExplanation: [
                        {
                            "text": "\"I know how to\"",
                            "original": "I know how to"
                        }
                    ]
                };
            }
        });

        const link = wrapper.find('.competencyLink');
        await link.trigger('click');
        expect(goToCompetency).toHaveBeenCalled();
    });
});
