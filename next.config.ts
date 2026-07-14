import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project has its own lockfile; pin the tracing root so Next doesn't
  // infer a parent directory (e.g. ~/package-lock.json) as the workspace root.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
