import * as Inputs from "../inputs";

/**
 * Contains various text methods.
 */
export class TextBitByBit {

    /**
     * Creates a text
     * @param inputs a text
     * @returns text
     * @group create
     * @shortname text
     * @drawable false
     */
    create(inputs: Inputs.Text.TextDto): string {
        return inputs.text;
    }

    /**
    * Split the text to multiple pieces by a separator
    * @param inputs a text
    * @returns text
    * @group transform
    * @shortname split
    * @drawable false
    */
    split(inputs: Inputs.Text.TextSplitDto): string[] {
        return inputs.text.split(inputs.separator);
    }

    /**
    * Replace all occurrences of a text by another text
    * @param inputs a text
    * @returns text
    * @group transform
    * @shortname replaceAll
    * @drawable false
    */
    replaceAll(inputs: Inputs.Text.TextReplaceDto): string {
        return inputs.text.split(inputs.search).join(inputs.replaceWith);
    }

    /**
    * Join multiple items by a separator into text
    * @param inputs a list of items
    * @returns text
    * @group transform
    * @shortname join
    * @drawable false
    */
    join(inputs: Inputs.Text.TextJoinDto): string {
        return inputs.list.join(inputs.separator);
    }

    /**
    * Transform any item to text
    * @param inputs any item
    * @returns text
    * @group transform
    * @shortname to string
    * @drawable false
    */
    toString<T>(inputs: Inputs.Text.ToStringDto<T>): string {
        return inputs.item.toString();
    }

    /**
    * Transform each item in list to text
    * @param inputs list of items
    * @returns texts
    * @group transform
    * @shortname to strings
    * @drawable false
    */
    toStringEach<T>(inputs: Inputs.Text.ToStringEachDto<T>): string[] {
        return inputs.list.map(i => i.toString());
    }

    /**
     * Format a text with values
     * @param inputs a text and values
     * @returns formatted text
     * @group transform
     * @shortname format
     * @drawable false
     */
    format(inputs: Inputs.Text.TextFormatDto): string {
        return inputs.text.replace(/{(\d+)}/g, (match, number) => {
            return typeof inputs.values[number] !== "undefined" ? inputs.values[number] : match;
        });
    }

}
