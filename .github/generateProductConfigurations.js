/**
 * Created at 2021/8/7 20:58
 *
 * @author Liangcheng Juves
 */

// @ts-check

const fs = require("fs");
const path = require("path");
const process = require("process");
const child_process = require("child_process");

const getCommitHash = () =>
  child_process.execSync("git log -1 --format='%H'")
    .toString()
    .replace(/\r/g, "")
    .replace(/\n/g, "");

function generateProductJson() {
  const outputFileName = "product.json";
  // @ts-ignore
  const _replaceName = (name) => name.replace(/-[ ]*/, "");

  const product = require(`../${outputFileName}`);
  const vsProduct = require(`../vs-${outputFileName}`);

  product["nameShort"] = _replaceName(product["nameShort"]).replace(" ", "");
  product["nameLong"] = _replaceName(product["nameLong"]);
  product["applicationName"] = _replaceName(product["applicationName"]);
  product["win32MutexName"] = "codeoss";
  product["win32DirName"] = vsProduct["win32DirName"];
  // product["win32RegValueName"] = vsProduct["win32RegValueName"];
  product["win32AppId"] = vsProduct["win32AppId"];
  product["win32x64AppId"] = vsProduct["win32x64AppId"];
  product["win32arm64AppId"] = vsProduct["win32arm64AppId"];
  product["win32UserAppId"] = vsProduct["win32UserAppId"];
  product["win32x64UserAppId"] = vsProduct["win32x64UserAppId"];
  product["win32arm64UserAppId"] = vsProduct["win32arm64UserAppId"];
  product["win32ShellNameShort"] = _replaceName(product["win32ShellNameShort"]).replace(" ", "");
  product["darwinBundleIdentifier"] = vsProduct["darwinBundleIdentifier"];
  product["darwinExecutable"] = "CodeOSS";
  product["dataFolderName"] = `.${product["applicationName"]}`;
  product["serverApplicationName"] = `${product["applicationName"]}-server`;
  product["serverDataFolderName"] = `${product["dataFolderName"]}-server`;
  product["webviewContentExternalBaseUrlTemplate"] =
    vsProduct["webviewContentExternalBaseUrlTemplate"];
  product["urlProtocol"] = "vscode";
  // product["serverGreeting"] = vsProduct["serverGreeting"];
  product["quality"] = vsProduct["quality"];
  product["extensionsGallery"] = vsProduct["extensionsGallery"];
  product["extensionTips"] = vsProduct["extensionTips"];
  product["extensionImportantTips"] = vsProduct["extensionImportantTips"];
  product["keymapExtensionTips"] = vsProduct["keymapExtensionTips"];
  product["languageExtensionTips"] = vsProduct["languageExtensionTips"];
  product["configBasedExtensionTips"] = vsProduct["configBasedExtensionTips"];
  product["exeBasedExtensionTips"] = vsProduct["exeBasedExtensionTips"];
  product["webExtensionTips"] = vsProduct["webExtensionTips"];
  product["remoteExtensionTips"] = vsProduct["remoteExtensionTips"];
  product["extensionKeywords"] = vsProduct["extensionKeywords"];
  product["extensionAllowedBadgeProviders"] =
    vsProduct["extensionAllowedBadgeProviders"];
  product["extensionAllowedBadgeProvidersRegex"] =
    vsProduct["extensionAllowedBadgeProvidersRegex"];
  product["crashReporter"] = vsProduct["crashReporter"];
  product["appCenter"] = vsProduct["appCenter"];
  product["enableTelemetry"] = false;
  product["aiConfig"] = vsProduct["aiConfig"];
  product["msftInternalDomains"] = vsProduct["msftInternalDomains"];
  // product["sendASmile"] = vsProduct["sendASmile"];
  product["extensionAllowedProposedApi"] =
    vsProduct["extensionAllowedProposedApi"];
  product["extensionKind"] = vsProduct["extensionKind"];
  product["extensionPointExtensionKind"] =
    vsProduct["extensionPointExtensionKind"];
  product["extensionSyncedKeys"] = vsProduct["extensionSyncedKeys"];
  product["extensionVirtualWorkspacesSupport"] =
    vsProduct["extensionVirtualWorkspacesSupport"];
  product["linkProtectionTrustedDomains"] =
    vsProduct["linkProtectionTrustedDomains"];
  product["auth"] = vsProduct["auth"];
  product["configurationSync.store"] = vsProduct["configurationSync.store"];
  product["builtInExtensions"] = vsProduct["builtInExtensions"];
  product["commit"] = `${getCommitHash()}`;
  product["date"] = new Date().toJSON();

  // product["settingsSearchBuildId"] = vsProduct["settingsSearchBuildId"];
  // product["darwinUniversalAssetId"] = vsProduct["darwinUniversalAssetId"];

  // for (let i in product["serverGreeting"]) {
  //   let item = product["serverGreeting"][i];
  //   product["serverGreeting"][i] = item.replace(
  //     vsProduct["nameLong"],
  //     product["nameLong"],
  //   );
  // }

  const writeStream = fs.createWriteStream(outputFileName);
  writeStream.write(JSON.stringify(product));
  writeStream.end();

  console.log(`Generate "${outputFileName}" successfully!`);
}

function generateWin32VisualElementsManifest() {
  const outputFileName = "VisualElementsManifest.xml";
  // @ts-ignore
  const _replaceName = (name) => name.replace(/[ ]-[ ]/, "");

  const visualElementsManifestXmlPath = path.join(
    process.cwd(),
    "resources",
    "win32",
    outputFileName,
  );

  const contents = fs.readFileSync(visualElementsManifestXmlPath);

  fs.writeFileSync(
    visualElementsManifestXmlPath,
    _replaceName(contents.toString()),
  );

  console.log(`Generate "${outputFileName}" successfully!`);
}

generateProductJson();
generateWin32VisualElementsManifest();
