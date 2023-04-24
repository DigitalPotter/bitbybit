

// tslint:disable-next-line: no-namespace
export namespace Lists {

    export enum FirstLastEnum {
        first = 'first',
        last = 'last',
    }

    export class ListItemDto {
        /**
         * The list to interrogate
         * @default undefined
         */
        list: any[];
        /**
         * Index of the item in the list - 0 means first.
         * @default 0
         * @minimum 0
         * @maximum Infinity
         * @step 1
         */
        index: number = 0;
    }
    export class SubListDto {
        /**
         * The list to split into a sublist
         * @default undefined
         */
        list: any[];
        /**
         * Index from which to start the sublist - 0 means first.
         * @default 0
         * @minimum 0
         * @maximum Infinity
         * @step 1
         */
        indexStart: number = 0;
        /**
         * Index to which to end the sublist - 0 means first.
         * @default 1
         * @minimum 0
         * @maximum Infinity
         * @step 1
         */
        indexEnd: number = 1;
    }
    export class ListDto {
        /**
         * The list to interrogate
         * @default undefined
         */
        list: any[];
    }
    export class GroupListDto {
        /**
         * The list of elements to group together
         * @default undefined
         */
        list: any[];
        /**
         * The number of elements in each group
         * @default 2
         * @minimum 1
         * @maximum Infinity
         * @step 1
         */
        nrElements: number = 2;
        /**
         * If true, the remainder of the list will be added as a separate group
         * @default false
         */
        keepRemainder: boolean = false;
    }
    export class MultiplyItemDto {
        /**
         * The item to multiply
         * @default undefined
         */
        item: any;
        /**
         * Times to multiply
         * @default 10
         * @minimum 0
         * @maximum Infinity
         * @step 1
         */
        times: number;
    }
    export class AddItemAtIndexDto {
        /**
         * The list to which item needs to be added
         * @default undefined
         */
        list: any[];
        /**
         * The item to add
         * @default undefined
         */
        item: any;
        /**
         * The index to add the item at
         * @default 0
         * @minimum 0
         * @maximum Infinity
         * @step 1
         */
        index: number = 0;
    }
    export class AddItemAtIndexesDto {
        /**
         * The list to which item needs to be added
         * @default undefined
         */
        list: any[];
        /**
         * The item to add
         * @default undefined
         */
        item: any;
        /**
         * The index to add the item at
         * @default [0]
         */
        indexes: number[] = [0];
    }

    export class AddItemsAtIndexesDto {
        /**
         * The list to which item needs to be added
         * @default undefined
         */
        list: any[];
        /**
         * The item to add
         * @default undefined
         */
        items: any[];
        /**
         * The index to add the item at
         * @default [0]
         */
        indexes: number[] = [0];
    }
    export class RemoveItemAtIndexDto {
        /**
        * The list from which item needs to be removed
        * @default undefined
        */
        list: any[];
        /**
         * The index to on which remove item
         * @default 0
         * @minimum 0
         * @maximum Infinity
         * @step 1
         */
        index: number = 0;
    }
    export class RemoveNthItemDto {
        /**
        * The list from which item needs to be removed
        * @default undefined
        */
        list: any[];
        /**
         * The nth item to remove
         * @default 2
         * @minimum 1
         * @maximum Infinity
         * @step 1
         */
        nth: number = 2;
        /**
         * The offset from which to start counting
         * @default 0
         * @minimum 0
         * @maximum Infinity
         * @step 1
         */
        offset: number = 0;
    }
    export class GetByPatternDto {
        /**
        * The list from which we need to get an item
        * @default undefined
        */
        list: any[];
        /**
         * The list of booleans to be used as a pattern (true means get, false means skip)
         * @default [true, true, false]
         */
        pattern: boolean[] = [true, true, false];
    }
    export class GetNthItemDto {
        /**
        * The list from which we need to get an item
        * @default undefined
        */
        list: any[];
        /**
         * The nth item to get
         * @default 2
         * @minimum 1
         * @maximum Infinity
         * @step 1
         */
        nth: number = 2;
        /**
         * The offset from which to start counting
         * @default 0
         * @minimum 0
         * @maximum Infinity
         * @step 1
         */
        offset: number = 0;
    }
    export class GetLongestListLength {
        /**
         * The list from which we need to get an item
         * @default undefined
         */
        lists: any[];
    }
    export class MergeElementsOfLists {
        /**
        * The list from which we need to get an item
        * @default undefined
        */
        lists: any[];
        /**
         * The level on which to merge the elements. 0 means first level
         * @default 0
         * @minimum 0
         * @maximum Infinity
         * @step 1
         */
        level: number = 0;
    }
    export class AddItemFirstLastDto {
        /**
         * The list to which item needs to be added
         * @default undefined
         */
        list: any[];
        /**
         * The item to add
         * @default undefined
         */
        item: any;
        /**
         * The option if the item needs to be added at the beginning or the end of the list
         * @default last
         */
        position: FirstLastEnum = FirstLastEnum.last;
    }
}
