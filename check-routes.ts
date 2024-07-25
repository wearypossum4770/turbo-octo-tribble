import { readdir, readFile, writeFile, unlink, mkdir } from "node:fs";
import { dirname, basename } from 'node:path'
import { fileURLToPath } from "node:url";
const contents = `export default function(){return <h1>Hello</h1>}`
const source = fileURLToPath(new URL("./src", import.meta.url));
const lib = `${source}/lib`
const directoryPath = `${source}/app`;
// prettier-ignore
const colors = [ {backgroundColor: "rgba(61, 77, 182, 0.24);",border: "1px solid rgba(61, 77, 182, 0.24);",color: "rgb(55, 69, 164)",}, {backgroundColor: "rgba(234, 90, 69, 0.24);",border: "1px solid rgba(234, 90, 69, 0.24);",color: "rgb(231, 66, 42)",}, {backgroundColor: "rgba(198, 178, 21, 0.24);",border: "1px solid rgba(198, 178, 21, 0.24);",color: "rgb(178, 160, 19)",}, {backgroundColor: "rgba(96, 189, 78, 0.24);",border: "1px solid rgba(96, 189, 78, 0.24);",color: "rgb(83, 175, 65)",}, {backgroundColor: "rgba(254, 85, 5, 0.24);",border: "1px solid rgba(254, 85, 5, 0.24);",color: "rgb(232, 75, 1)",}, {backgroundColor: "rgba(20, 146, 244, 0.24);",border: "1px solid rgba(20, 146, 244, 0.24);",color: "rgb(11, 132, 227)",}, {backgroundColor: "rgba(20, 192, 244, 0.24);",border: "1px solid rgba(20, 192, 244, 0.24);",color: "rgb(11, 177, 227)",}, {backgroundColor: "rgba(194, 119, 224, 0.24);",border: "1px solid rgba(194, 119, 224, 0.24);",color: "rgb(182, 91, 218)",}, {backgroundColor: "rgba(3, 149, 135, 0.24);",border: "1px solid rgba(3, 149, 135, 0.24);",color: "rgb(3, 134, 121)",}, {backgroundColor: "rgba(52, 69, 98, 0.24);",border: "1px solid rgba(52, 69, 98, 0.24);",color: "rgb(47, 62, 88)",}, {backgroundColor: "rgba(255, 165, 0, 0.24);",border: "1px solid rgba(255, 165, 0, 0.24);",color: "rgb(230, 148, 0)",}, {backgroundColor: "rgba(60, 179, 113, 0.24);",border: "1px solid rgba(60, 179, 113, 0.24);",color: "rgb(54, 161, 102)",}, {backgroundColor: "rgba(211, 211, 211, 0.24);",border: "1px solid rgba(211, 211, 211, 0.24);",color: "rgb(190, 190, 190)",}, {backgroundColor: "rgba(93, 109, 126, 0.24);",border: "1px solid rgba(93, 109, 126, 0.24);",color: "rgb(84, 98, 113)",}, {backgroundColor: "rgba(100, 30, 22, 0.24);",border: "1px solid rgba(100, 30, 22, 0.24);",color: "rgb(90, 27, 20)",}, {backgroundColor: "rgba(91, 44, 111, 0.24);",border: "1px solid rgba(91, 44, 111, 0.24);",color: "rgb(82, 40, 100)",}, {backgroundColor: "rgba(211, 84, 0, 0.24);",border: "1px solid rgba(211, 84, 0, 0.24);",color: "rgb(190, 76, 0)",}, {backgroundColor: "rgba(240, 128, 128, 0.24);",border: "1px solid rgba(240, 128, 128, 0.24);",color: "rgb(236, 95, 95)",}, {backgroundColor: "rgba(170, 194, 0, 0.24);",border: "1px solid rgba(170, 194, 0, 0.24);",color: "rgb(153, 174, 0)",}, {backgroundColor: "rgba(222, 49, 99, 0.24);",border: "1px solid rgba(222, 49, 99, 0.24);",color: "rgb(210, 34, 85)",},]
// prettier-ignore
const sidbarMenu = [{"id": 32476,"environment": "development","projectId": 12302,"organizationId": 11513,"isEnabled": true,"label": "Development","banner": {"bannerColor": "#3d4db6", "bannerText": "Development Environment", "description": ""},"features": [{ "id": 1, "href": "feature", "label": "Feature" },{ "id": 2, "href": "setting", "label": "Setting" },{ "id": 3, "href": "scheduling", "label": "Scheduling"}]},{"id": 32475,"environment": "production","label": "Production","projectId": 12302,"organizationId": 11513,"isEnabled": true,"banner": {"bannerColor": "#3d4db6", "bannerText": "Development Environment", "description": ""},"features": [{ "id": 1, "href": "feature", "label": "Feature" },{ "id": 2, "href": "setting", "label": "Setting" },{ "id": 3, "href": "scheduling", "label": "Scheduling"}]}]
// prettier-ignore
const features = [{"feature_state_value":"TRUE, FALSE","default_enabled":true,"multivariate_feature_state_values":[],"identity":null,"type":"STANDARD","id":54133,"name":"privacy-policy-consent","deleted_at":null,"uuid":"0ee3b5f3-24cb-439f-b0b8-feafc7016c91","isEnabled":true,"created_at":"2023-08-27T17:17:47.364035Z","updated_at":"2023-08-27T17:17:47.364044Z","live_from":"2023-08-27T17:17:47.363903Z","version":1,"feature":54133,"environment":32476,"owner_id":16610,"feature_segment":null,"is_archived":false,"description":"When user accepts privacy policy","tags":[2819],"change_request":null,"num_segment_overrides":0,"num_identity_overrides":null,"is_server_key_only":false,"last_modified_in_any_environment":null,"last_modified_in_current_environment":null,"project":12302,"environment_feature_version":null,"environment_id":313986},{"id":2712,"name":"oauth_github","type":"STANDARD","isEnabled":true},{"id":2713,"name":"oauth_google","type":"STANDARD","isEnabled":true},{"id":5538,"name":"plan_based_access","type":"STANDARD","isEnabled":true},{"id":5560,"name":"integrations","type":"STANDARD","isEnabled":true},{"id":5564,"name":"integration_data","type":"STANDARD","isEnabled":true},{"id":6006,"name":"usage_chart","type":"STANDARD","isEnabled":true},{"id":7460,"name":"flag_analytics","type":"STANDARD","isEnabled":true},{"id":8798,"name":"read_only_mode","type":"STANDARD","isEnabled":false},{"id":10202,"name":"saml","type":"STANDARD","isEnabled":true},{"id":11639,"name":"payments_enabled","type":"STANDARD","isEnabled":true},{"id":14884,"name":"upgrade_subscription","type":"STANDARD","isEnabled":true},{"id":15278,"name":"compare_environments","type":"STANDARD","isEnabled":true},{"id":15394,"name":"force_2fa","type":"STANDARD","isEnabled":true},{"id":15875,"name":"disable_oauth_registration","type":"STANDARD","isEnabled":true},{"id":16077,"name":"update_feature_state_permission","type":"STANDARD","isEnabled":true},{"id":16404,"name":"organisation_permissions","type":"STANDARD","isEnabled":true},{"id":16857,"name":"mailing_list","type":"STANDARD","isEnabled":true},{"id":17718,"name":"tags","type":"STANDARD","isEnabled":true},{"id":18059,"name":"serverside_sdk_keys","type":"STANDARD","isEnabled":true},{"id":19868,"name":"search_algorithm","type":"STANDARD","isEnabled":false},{"id":21165,"name":"scheduling","type":"STANDARD","isEnabled":true},{"id":22017,"name":"manage_identities_permission","type":"STANDARD","isEnabled":true},{"id":24103,"name":"beta_features","type":"STANDARD","isEnabled":true},{"id":25009,"name":"allow_client_traits","type":"STANDARD","isEnabled":true},{"id":25213,"name":"master_api_key","type":"STANDARD","isEnabled":true},{"id":27854,"name":"sso_idp","type":"STANDARD","isEnabled":false},{"id":28083,"name":"flag_based_segments","type":"STANDARD","isEnabled":true},{"id":30754,"name":"default_user_groups","type":"STANDARD","isEnabled":true},{"id":32474,"name":"group_external_ids","type":"STANDARD","isEnabled":true},{"id":33869,"name":"rotate_api_token","type":"STANDARD","isEnabled":true},{"id":34604,"name":"tag_environments","type":"STANDARD","isEnabled":true},{"id":35097,"name":"view_identities_permission","type":"STANDARD","isEnabled":true},{"id":39317,"name":"delete_organisation","type":"STANDARD","isEnabled":true},{"id":39340,"name":"delete_environment","type":"STANDARD","isEnabled":true},{"id":39344,"name":"delete_project","type":"STANDARD","isEnabled":true},{"id":39871,"name":"hide_disabled_flags_environment","type":"STANDARD","isEnabled":true},{"id":41896,"name":"group_admins","type":"STANDARD","isEnabled":true},{"id":45632,"name":"disable_users_as_reviewers","type":"STANDARD","isEnabled":false},{"id":45633,"name":"enable_groups_as_reviewers","type":"STANDARD","isEnabled":true},{"id":45645,"name":"configure_hide_sensitive_data","type":"STANDARD","isEnabled":false},{"id":42925,"name":"change_email","type":"STANDARD","isEnabled":true},{"id":44132,"name":"delete_account","type":"STANDARD","isEnabled":true},{"id":46034,"name":"is_server_key_only","type":"STANDARD","isEnabled":true},{"id":46691,"name":"max_api_calls_alert","type":"STANDARD","isEnabled":false},{"id":47408,"name":"compare_identities","type":"STANDARD","isEnabled":true},{"id":47729,"name":"verify_seats_limit_for_invite_links","type":"STANDARD","isEnabled":false},{"id":48378,"name":"consistent_hashing_setting","type":"STANDARD","isEnabled":true},{"id":52226,"name":"feature_versioning","type":"STANDARD","isEnabled":false},{"id":54542,"name":"announcement","type":"STANDARD","isEnabled":true},{"id":55820,"name":"show_role_management","type":"STANDARD","isEnabled":true},{"id":58966,"name":"import_project","type":"STANDARD","isEnabled":true},{"id":60004,"name":"enable_metadata","type":"STANDARD","isEnabled":true},{"id":62797,"name":"a_temp_feature","type":"STANDARD","isEnabled":false},{"id":64378,"name":"payments_on_blocked_page","type":"STANDARD","isEnabled":true},{"id":64850,"name":"show_dunning_banner","type":"STANDARD","isEnabled":false},{"id":71098,"name":"audit_log_detail","type":"STANDARD","isEnabled":true},{"id":75564,"name":"split_testing","type":"STANDARD","isEnabled":false},{"id":80177,"name":"github_integration","type":"STANDARD","isEnabled":true},{"id":89860,"name":"clone_identities","type":"STANDARD","isEnabled":true},{"id":93497,"name":"realtime_setting","type":"STANDARD","isEnabled":true},{"id":95121,"name":"saml_configuration","type":"STANDARD","isEnabled":true},{"id":95687,"name":"test_github_integration","type":"STANDARD","isEnabled":true},{"id":95807,"name":"server-side-test","type":"MULTIVARIATE","isEnabled":false},{"id":96101,"name":"New_exciting_feature","type":"STANDARD","isEnabled":false},{"id":96122,"name":"slicknewfeature","type":"STANDARD","isEnabled":false},{"id":96125,"name":"new_home_page","type":"MULTIVARIATE","isEnabled":false}]
const authorizedFiles = new Set([
  // "posts/[id].tsx",
  // "blog/[slug]/page.tsx",
  // "dashboard/page.tsx",
  // "api/calendar/create/page.tsx",
  // "features/",
  "api/security/issue-certificate/page.ts",
  "features/page.tsx",
  "features/[environment]/page.tsx",
  "features/[environment]/[feature]/page.tsx",
  "features/[environment]/[feature]/[flag]/page.tsx",
  "api/features/index.tsx",
  "api/features/[id].tsx",
  "api/user/profile.tsx",
  "features/page.tsx",
  "static-types.tsx",
  "features/layout.tsx",
  "about/page.tsx",
  "dashboard/page.tsx",
  'favicon.ico',
  "globals.css",
  "layout.tsx",
  "headers.ts",
  "main.css",
  "feature-card.css",
  "feature-sidebar.css",
  "globals.css",
  "main.css",
  "tags.css",
  "main.css",
  "page.tsx",
])

const ensureDirectory = async (filename: string) => {
  const file = basename(filename)
  mkdir(dirname(filename), { recursive: true } , async (makeDirError,path) => {
    if (makeDirError) return makeDirError
    writeFile(`${path}/${basename(filename)}`, contents, async (writeError) => {
      if (writeError) console.log(`\x1b[31m After creating directory, unable to write file: ${file} \x1b[0m`, writeError)
      console.log(`\x1b[32m After creating directory, Successfully created the file: ${filename} \x1b[0m `)
    })
  })
}

const inspectDirectory = async (): Promise<Set<string>> =>
    new Promise((res, rej) =>
      readdir(
        directoryPath,
        (directoryError: Error | null, files: Array<string>) => {
          if (directoryError)
            return rej(`\x1b[31m Unable to scan directory: ${directoryError} \x1b[0m `);
          console.log(
            `\x1b[1m Reading route directory; directory contains \x1b[5m ${files.length}\x1b[25m  files \x1b[0m `,
          );
          return res(new Set(files));
        },
      ),
    );
  const checkForCreateFile = (files: Set<string>) => {
    authorizedFiles.forEach((file) => {
      const filename = `${directoryPath}/${file}`;
      readFile(filename, (readError) => {
        if (!readError || files.has(file))
          return console.log(`\x1b[2m File exists: ${file} \x1b[0m`);
        console.log(`\x1b[31m error reading the file: ${file} \x1b[0m`);
        writeFile(filename, contents, (writeError) => {
          if (writeError) {
            ensureDirectory(filename)
            console.log(`\x1b[31m Error writing the file: ${file} \x1b[0m`);
          }
          else console.log(`\x1b[92m Successfully created the file: ${file} \x1b[0m`);
        });
      });
    });
  };
  const deleteUnauthorizedFiles = (files: Set<string>) => {
    files.forEach((file) => {
      if (authorizedFiles.has(file))
        return console.log(`\x1b[9m File found in authorized list ${file} \x1b[0m `);
      console.log(`Found unauthorized file: ${file}\tDeleting...`);
      unlink(`${directoryPath}/${file}`, (unlinkError) => {
        if (unlinkError)
          return console.log(`\x1b[31m  Error deleting/unlinking file: ${file} \x1b[0m `);
      });
    });
    return files;
  };
  const dataTables = [
    { filename: "features.json", contents: features},
    { filename: 'environments.json', contents: sidbarMenu},
    { filename: 'colors.json', contents: colors},
  ].map(({filename, contents}) => ({filename, contents: JSON.stringify(contents)}))

  const saveDataTables = (...args: unknown[]) => args.concat(dataTables.forEach(table=> writeFile(`${lib}/fixtures/${table.filename}`, table.contents, (writeError) => {
    if (writeError) console.log(`\x1b[91m Error writing data fle: ${table.filename} \x1b[0m`)
    else console.log(`\x1b[92m Successfully wrote data file: ${table.filename} \x1b[0m`)
  })))
  const cleanUpRoutes = () =>
    inspectDirectory().then(deleteUnauthorizedFiles).then(checkForCreateFile).then(saveDataTables);
  cleanUpRoutes();
  

  /**
   * has_feature(key)
feature_enabled(key)
feature_enabled(key, userId)
get_value(key)
get_value(key, userId)
set_trait(trait_key, trait_value, userId)
get_trait(trait_key, userId)
get_flags()
get_flags_for_user(userId)
   */