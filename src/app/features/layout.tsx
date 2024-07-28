"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SyntheticEvent, useEffect } from "react";
import environments from "@/lib/fixtures/environments.json";
import type {
  FeatureEnvironment,
  FeatureParams,
  FeatureConfig,
} from "@/app/static-types";

const FeatureFlagLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams() as FeatureParams;
  useEffect(() => {
    document
      .querySelectorAll("details.environment-container")
      .forEach((detail) =>
        detail.setAttribute("name", "environment-container"),
      );
  }, []);
  const setActiveLink = (
    { href }: FeatureConfig,
    { environment }: FeatureEnvironment,
  ) => environment === params.environment && href?.includes(params.feature);
  const createEnvironment = (e: SyntheticEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <main className="feature-flag-layout">
        <aside className="feature-flag-sidebar">
          <h3>[Project Name]</h3>
          <h4>Project Settings</h4>
          <form className="create-environment" onSubmit={createEnvironment}>
            <label htmlFor="create-environment">
              <span>Environments</span>{" "}
              <input type="button" value="+" name="" id="create-environment" />
            </label>
          </form>
          {environments.map((sidebar: FeatureEnvironment) => (
            <details className="environment-container" key={sidebar.id}>
              <summary>{sidebar.label}</summary>
              <ul className="environment-list">
                {sidebar.configurations?.map((config) => (
                  <li
                    key={config.id}
                    data-is-link-active={setActiveLink(config, sidebar)}
                  >
                    <Link
                      href={`/features/${sidebar.environment}/${config.href}`}
                    >
                      {config.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </aside>
        <section> {children}</section>
      </main>
    </>
  );
};

export default FeatureFlagLayout;
