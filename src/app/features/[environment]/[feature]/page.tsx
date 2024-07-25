import { formatDate, dateDifference } from "@/lib/helpers";
import type { TagWidget } from "@/app/static-types";
import tags from "@/lib/fixtures/tags.json";
// eventSourceUrl + "sse/environments/" + environmentID + "/stream"
// prettier-ignore
const featureTag = new Set([ "protected", "donotdelete", "permanent",])

const feature = {
  featureName: "",
  featureLabel: "show_footer_icons",
  get humanizeDateCreated() {
    return formatDate(this.dateCreated);
  },
  dateCreated: new Date("Wed, 13 Oct 2021 01:38:34 GMT"),
  featureDescription: "Created",
};
const flag = {
  id: 313986,
  feature_state_value: "TRUE, FALSE",
  multivariate_feature_state_values: [],
  identity: null,
  deleted_at: null,
  tags: [],
  messageType: "warn",
  messageStatus: "read",
  label: "privacy-privacy-consent",
  uuid: "0ee3b5f3-24cb-439f-b0b8-feafc7016c91",
  enabled: true,
  created_at: "2023-08-27T17:17:47.364035Z",
  updated_at: "2023-08-27T17:17:47.364044Z",
  live_from: "2023-08-27T17:17:47.363903Z",
  version: 1,
  feature: 54133,
  environment: 32476,
  feature_segment: null,
  change_request: null,
  get dateCreated() {
    return new Date(this.created_at);
  },
  get dateCreatedParts() {
    return dateDifference(this.dateCreated);
  },
  environment_feature_version: null,
};

const logger = console.log;
const EnvironmentFeatureManagement = () => {
  return (
    <>
      <h1>Feature Management</h1>
      <form>
        <article className="feature-details-management">
          <header>
            <span className="feature-name">{flag.label}</span>
            <button className="copy-to-clipboard" type="button"></button>
            <ul className="feature-tag-list">
              {tags.map(({ label, id }: TagWidget) => (
                <li key={id} className="feature-tag">
                  {label}
                </li>
              ))}
            </ul>
          </header>
          <main>
            <span
              className="feature-description"
              data-name="list-item-subtitle"
              data-for="867f-0aae-c48d"
              data-tip="true"
              data-currentitem="false"
            >
              <small>When user accepts privacy policy</small>
            </span>
            <div className="feature-creation" data-for="e93e-99bd-2098">
              <span className="feature-creation-message">
                Created {flag.dateCreatedParts.days} days ago
              </span>
              <img
                data-message-type={flag.messageType}
                width="10"
                height="10"
                src="/warning-sign.svg"
              />
            </div>
            <div>
              <label htmlFor="data-type">Type of Data</label>
              <select id="data-type">
                <option value="">Select variable type</option>
                <option value="bool">Boolean</option>
                <option value="str">String</option>
                <option value="string_vector">CSV/String Array(Vector)</option>
              </select>
            </div>
            <div hidden={true}>
              <label>Enter each value on a separate line.</label>
              <textarea></textarea>
            </div>
          </main>
        </article>
      </form>
    </>
  );
};

export default EnvironmentFeatureManagement;
export const generateStaticParams = () => [{ tags: [] }];
