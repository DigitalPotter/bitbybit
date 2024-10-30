
import * as Inputs from "../inputs/inputs";
import { AssetManager } from "../../asset-manager";

export class Asset {
    public assetManager: AssetManager;
    constructor() {
        this.assetManager = new AssetManager();
    }

    /**
     * Gets the asset file
     * @param inputs file name to get from project assets
     * @returns Blob of asset
     * @group get
     * @shortname cloud file
     */
    getFile(inputs: Inputs.Asset.GetAssetDto): Promise<File> {
        return this.assetManager.getAsset(inputs.fileName);
    }

    /**
     * Gets the local asset file stored in your browser.
     * @param inputs asset name to get from local assets
     * @returns Blob of asset
     * @group get
     * @shortname local file
     */
    getLocalFile(inputs: Inputs.Asset.GetAssetDto): Promise<File | File[]> {
        return this.assetManager.getLocalAsset(inputs.fileName);
    }

    /**
     * Fetches the blob from the given url, must be CORS enabled accessible endpoint
     * @param inputs url of the asset
     * @returns Blob
     * @group fetch
     * @shortname fetch blob
     */
    async fetchBlob(inputs: Inputs.Asset.FetchDto): Promise<Blob> {
        const res = await fetch(inputs.url);
        return res.blob();
    }

    /**
     * Fetches the file from the given url, must be CORS enabled accessible endpoint
     * @param inputs url of the asset
     * @returns File
     * @group fetch
     * @shortname fetch file
     */
    async fetchFile(inputs: Inputs.Asset.FetchDto): Promise<File> {
        const res = await fetch(inputs.url);
        const blob = await res.blob();
        return new File([blob], inputs.url.split("/").pop().split("?")[0]);
    }

    /**
     * Fetches the json from the given url, must be CORS enabled accessible endpoint
     * @param inputs url of the asset
     * @returns JSON
     * @group fetch
     * @shortname fetch json
     */
    async fetchJSON(inputs: Inputs.Asset.FetchDto): Promise<any> {
        const res = await fetch(inputs.url);
        return res.json();
    }

    /**
     * Fetches the json from the given url, must be CORS enabled accessible endpoint
     * @param inputs url of the asset
     * @returns Text
     * @group fetch
     * @shortname fetch text
     */
    async fetchText(inputs: Inputs.Asset.FetchDto): Promise<string> {
        const res = await fetch(inputs.url);
        return res.text();
    }

    /**
     * Gets and creates the url string path to your file stored in your memory.
     * @param File or a blob
     * @returns URL string of a file
     * @group create
     * @shortname object url
     */
    createObjectURL(inputs: Inputs.Asset.FileDto): string {
        return URL.createObjectURL(inputs.file);
    }

    /**
     * Gets and creates the url string paths to your files stored in your memory.
     * @param Files or a blobs
     * @returns URL strings for given files
     * @group create
     * @shortname object urls
     */
    createObjectURLs(inputs: Inputs.Asset.FilesDto): string[] {
        return inputs.files.map(f => URL.createObjectURL(f));
    }

}
