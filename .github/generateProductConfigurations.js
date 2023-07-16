/**
 * Created at 2021/8/7 20:58
 *
 * @author Liangcheng Juves
 */

// @ts-check

const fs = require("fs");
const path = require("path");
const process = require("process");
const childProcess = require("child_process");

const productJsonFileName = "product.json";
const productJson = require(`../${productJsonFileName}`);
const vsProductJson = require(`../vs-${productJsonFileName}`);

const getCommitHash = () =>
	childProcess.execSync("git log -1 --format='%H'")
		.toString()
		.replace(/\r/g, "")
		.replace(/\n/g, "");

function generateProductJson() {
	// @ts-ignore
	const _replaceName = (/** @type {string} */ name) => name.replace(/-[ ]*/, "");

	productJson["nameShort"] = _replaceName(productJson["nameShort"]).replace(" ", "");
	productJson["nameLong"] = _replaceName(productJson["nameLong"]);
	productJson["applicationName"] = _replaceName(productJson["applicationName"]);
	productJson["tunnelApplicationName"] = `${productJson["applicationName"]}-tunnel`;
	productJson["tunnelApplicationConfig"] = vsProductJson["tunnelApplicationConfig"];

	productJson["win32MutexName"] = productJson["applicationName"];
	productJson["win32TunnelServiceMutex"] = `${productJson["applicationName"]}-tunnelservice`;
	productJson["win32TunnelMutex"] = productJson["tunnelApplicationName"];
	productJson["win32DirName"] = vsProductJson["win32DirName"];
	productJson["win32AppId"] = vsProductJson["win32AppId"];
	productJson["win32x64AppId"] = vsProductJson["win32x64AppId"];
	productJson["win32arm64AppId"] = vsProductJson["win32arm64AppId"];
	productJson["win32UserAppId"] = vsProductJson["win32UserAppId"];
	productJson["win32x64UserAppId"] = vsProductJson["win32x64UserAppId"];
	productJson["win32arm64UserAppId"] = vsProductJson["win32arm64UserAppId"];
	productJson["win32ShellNameShort"] = _replaceName(productJson["win32ShellNameShort"])
		.replace(" ", "");

	productJson["darwinBundleIdentifier"] = vsProductJson["darwinBundleIdentifier"];
	productJson["darwinExecutable"] = "CodeOSS";
	productJson["dataFolderName"] = `.${productJson["applicationName"]}`;
	productJson["urlProtocol"] = "vscode";
	productJson["serverApplicationName"] = `${productJson["applicationName"]}-server`;
	productJson["serverDataFolderName"] = `${productJson["dataFolderName"]}-server`;
	productJson["serverLicense"] = [
		"*",
		`* ${productJson["nameLong"]} Server`,
		"*",
		"* By using the software, you agree to",
		`* the ${productJson["nameLong"]} Server License Terms (${productJson["serverLicenseUrl"]}).`,
		"*"
	];
	productJson["serverLicensePrompt"] = vsProductJson["serverLicensePrompt"];
	productJson["quality"] = vsProductJson["quality"];
	productJson["linuxIconName"] = productJson["applicationName"];
	productJson["extensionsGallery"] = vsProductJson["extensionsGallery"];
	productJson["profileTemplatesUrl"] = vsProductJson["profileTemplatesUrl"];
	productJson["extensionRecommendations"] = vsProductJson["extensionRecommendations"];
	productJson["keymapExtensionTips"] = vsProductJson["keymapExtensionTips"];
	productJson["languageExtensionTips"] = vsProductJson["languageExtensionTips"];
	productJson["configBasedExtensionTips"] = vsProductJson["configBasedExtensionTips"];
	productJson["exeBasedExtensionTips"] = vsProductJson["exeBasedExtensionTips"];
	productJson["webExtensionTips"] = vsProductJson["webExtensionTips"];
	productJson["virtualWorkspaceExtensionTips"] = vsProductJson["virtualWorkspaceExtensionTips"];
	productJson["remoteExtensionTips"] = vsProductJson["remoteExtensionTips"];
	productJson["commandPaletteSuggestedCommandIds"] = vsProductJson["commandPaletteSuggestedCommandIds"];
	productJson["extensionKeywords"] = vsProductJson["extensionKeywords"];

	productJson["extensionAllowedBadgeProviders"] =
		vsProductJson["extensionAllowedBadgeProviders"];
	productJson["extensionAllowedBadgeProvidersRegex"] =
		vsProductJson["extensionAllowedBadgeProvidersRegex"];
	productJson["crashReporter"] = vsProductJson["crashReporter"];
	productJson["appCenter"] = vsProductJson["appCenter"];
	productJson["enableTelemetry"] = false;
	productJson["aiConfig"] = vsProductJson["aiConfig"];
	productJson["msftInternalDomains"] = vsProductJson["msftInternalDomains"];

	productJson["documentationUrl"] = vsProductJson["documentationUrl"];
	productJson["serverDocumentationUrl"] = vsProductJson["serverDocumentationUrl"];
	productJson["settingsSearchUrl"] = vsProductJson["settingsSearchUrl"];

	productJson["extensionEnabledApiProposals"] = vsProductJson["extensionEnabledApiProposals"];
	productJson["extensionKind"] = vsProductJson["extensionKind"];
	productJson["extensionPointExtensionKind"] =
		vsProductJson["extensionPointExtensionKind"];
	productJson["extensionSyncedKeys"] = vsProductJson["extensionSyncedKeys"];
	productJson["extensionVirtualWorkspacesSupport"] =
		vsProductJson["extensionVirtualWorkspacesSupport"];

	productJson["linkProtectionTrustedDomains"] =
		vsProductJson["linkProtectionTrustedDomains"];
	productJson["trustedExtensionAuthAccess"] =
		vsProductJson["trustedExtensionAuthAccess"];
	productJson["auth"] = vsProductJson["auth"];
	productJson["configurationSync.store"] = vsProductJson["configurationSync.store"];
	productJson["editSessions.store"] = vsProductJson["editSessions.store"];
	productJson["builtInExtensions"] = vsProductJson["builtInExtensions"];

	productJson["commit"] = `${getCommitHash()}`;
	productJson["date"] = new Date().toJSON();

	const writeStream = fs.createWriteStream(productJsonFileName);
	writeStream.write(JSON.stringify(productJson));
	writeStream.end();

	console.log(`Generate "${productJsonFileName}" successfully!`);
}

function generateWin32VisualElementsManifest() {
	const outputFileName = "VisualElementsManifest.xml";
	const visualElementsManifestXmlPath = path.join(
		process.cwd(),
		"resources",
		"win32",
		outputFileName,
	);

	const xml = fs.readFileSync(visualElementsManifestXmlPath).toString();
	fs.writeFileSync(
		visualElementsManifestXmlPath,
		xml.replace(/@@NAME_SHORT@@/g, productJson["nameShort"]),
	);

	console.log(`Generate "${outputFileName}" successfully!`);
}

function generateServerWebManifest() {
	const outputFileName = "manifest.json";
	const manifestJsonPath = path.join(
		process.cwd(),
		"resources",
		"server",
		outputFileName,
	);

	const manifest = JSON.parse(fs.readFileSync(manifestJsonPath).toString());
	manifest["name"] = productJson["nameLong"];
	manifest["short_name"] = productJson["nameShort"];
	fs.writeFileSync(
		manifestJsonPath,
		JSON.stringify(manifest),
	);

	console.log(`Generate "${outputFileName}" successfully!`);
}

function generateAppImageYAML() {
	const outputFileName = "AppImage.yml";
	const ymlPath = path.join(
		process.cwd(),
		"resources",
		"linux",
		outputFileName,
	);

	const yml = fs.readFileSync(ymlPath).toString();
	fs.writeFileSync(
		ymlPath,
		yml.replace(/@@NAME_SHORT@@/g, productJson["nameShort"]).replace(
			/@@NAME@@/g,
			productJson["applicationName"],
		).replace(/@@ICON@@/g, productJson["linuxIconName"]),
	);

	console.log(`Generate "${outputFileName}" successfully!`);
}

generateProductJson();
generateWin32VisualElementsManifest();
generateServerWebManifest();
generateAppImageYAML();
