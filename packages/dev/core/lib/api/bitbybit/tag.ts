import * as Inputs from "../inputs/inputs";
import { ContextBase } from "../context";

/**
 * Tags help you to put text on top of your 3D objects. Tags are heavily used in data visualization scenarios
 * where you need to convery additional textual information.
 */

export class Tag {

    constructor(private readonly context: ContextBase) { }

    /**
     * Creates a tag dto
     * @param inputs Tag description
     * @returns A tag
     */
    create(inputs: Inputs.Tag.TagDto): Inputs.Tag.TagDto {
        const tag = new Inputs.Tag.TagDto();
        tag.text = inputs.text;
        tag.position = inputs.position;
        tag.colour = inputs.colour;
        tag.size = inputs.size;
        tag.adaptDepth = inputs.adaptDepth;
        return tag;
    }

    /**
     * Draws a single tag
     * @param inputs Information to draw the tag
     * @returns A tag
     * @ignore true
     */
    drawTag(inputs: Inputs.Tag.DrawTagDto): Inputs.Tag.TagDto {
        if (inputs.tagVariable && inputs.updatable) {
            const tagToUpdate = this.context.tagBag.find(tag => tag.id === inputs.tagVariable.id);
            Object.keys(inputs.tag).forEach(key => {
                tagToUpdate[key] = inputs.tag[key];
            });
            tagToUpdate.needsUpdate = true;
        } else {
            const textNode = document.createElement("span");
            const id = "_tag" + new Date().getTime() + this.context.tagBag.length;
            inputs.tag.id = id;
            textNode.id = id;
            textNode.textContent = inputs.tag.text;
            document.querySelector("." + this.context.canvasZoneClass).appendChild(textNode);
            inputs.tag.needsUpdate = true;
            this.context.tagBag.push(inputs.tag);
        }
        return inputs.tag;
    }

    /**
     * Draws multiple tags
     * @param inputs Information to draw the tags
     * @returns Tags
     * @ignore true
     */
    drawTags(inputs: Inputs.Tag.DrawTagsDto): Inputs.Tag.TagDto[] {
        if (inputs.tagsVariable && inputs.updatable) {

            // check if list has grown, and add new empty tags to tags variable so that
            if (inputs.tagsVariable.length < inputs.tags.length) {
                for (let i = inputs.tagsVariable.length - 1; i < inputs.tags.length - 1; i++) {
                    const tagToCreate = inputs.tags[i];
                    const textNode = document.createElement("span");
                    const id = "_tag" + new Date().getTime() + this.context.tagBag.length;
                    tagToCreate.id = id;
                    textNode.id = id;
                    document.querySelector("." + this.context.canvasZoneClass).appendChild(textNode);
                    tagToCreate.needsUpdate = true;
                    this.context.tagBag.push(tagToCreate);
                    inputs.tagsVariable.push(tagToCreate);
                }
            }

            inputs.tagsVariable.forEach((tagFromVar, index) => {
                const tagToUpdate = this.context.tagBag.find(tag => tag.id === tagFromVar.id);
                const tagToUpdateWith = inputs.tags[index];
                if (tagToUpdateWith) {
                    Object.keys(tagToUpdateWith).forEach(key => {
                        tagToUpdate[key] = tagToUpdateWith[key];
                    });
                    tagToUpdate.needsUpdate = true;
                } else {
                    // delete tag
                    this.context.tagBag = this.context.tagBag.filter(tag => tag.id !== tagToUpdate.id);
                    const element = document.getElementById(tagToUpdate.id);
                    element.parentNode.removeChild(element);
                }
            });
        } else {
            const tagsToCreate = [];
            inputs.tags.forEach((tag, index) => {
                const textNode = document.createElement("span");
                const id = "_tag" + new Date().getTime() + this.context.tagBag.length;
                tag.id = id;
                textNode.id = id;
                textNode.textContent = tag.text;
                document.querySelector("." + this.context.canvasZoneClass).appendChild(textNode);
                tag.needsUpdate = true;
                this.context.tagBag.push(tag);
                tagsToCreate.push(tag);
                inputs.tagsVariable = tagsToCreate;
            });
        }
        return inputs.tagsVariable;
    }
}
