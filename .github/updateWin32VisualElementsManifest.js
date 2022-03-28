/**
 * Created at 2021/8/10 23:01
 *
 * @author Liangcheng Juves
 */

// @ts-check

/**
 * @param {string} name
 */
const replaceName = (name) => {
	return name.replace(/-[ ]/, "");
};

const outputFileName = "VisualElementsManifest.xml";

const fs = require("fs");
const path = require("path");

const visualElementsManifestXmlPath = path.join(
	process.cwd(),
	"resources",
	"win32",
	outputFileName
);

const contents = fs.readFileSync(visualElementsManifestXmlPath);

fs.writeFileSync(
	visualElementsManifestXmlPath,
	replaceName(contents.toString())
);

console.log(`Generate "${outputFileName}" successfully!`);
