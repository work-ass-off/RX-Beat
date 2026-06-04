# Sprint 2:  Routing & Signals — 2025-05-25

- **What was done:**
    Refactored and improved the existing GitHub Actions CI/CD workflow to make deployments more reliable and efficient. Split the pipeline into clearly separated jobs:
      1. CI: Validation and build stage responsible for dependency installation, linting, formatting checks, application build, Vercel environment synchronization, and generation of a prebuilt deployment package.
      2. Deploy Preview: Dedicated deployment stage for Pull Requests targeting sprint-* branches, using previously generated build artifacts to create preview environments.
      3. Deploy Production: Automated production deployment triggered after successful pushes to the develop branch.
    Added artifact-based deployment flow by archiving the generated .vercel build output and transferring it between jobs through GitHub Artifacts. Configured workflow permissions and GitHub Environments to expose deployment URLs directly inside GitHub Actions. Updated the pipeline to use Vercel prebuilt deployments (--prebuilt), allowing deployment jobs to reuse verified build results generated during CI instead of rebuilding the application multiple times.

- **Problems:**
    * Deployment environment variables configured in Vercel were not automatically available during GitHub Actions execution, causing deployment and build inconsistencies between local, Vercel, and CI environments.
    * The previous workflow performed redundant build operations during deployment stages, increasing execution time and resource consumption.
    * Passing build output between isolated GitHub jobs required an additional mechanism because each job runs on a separate runner instance.

- **Solutions:**
    * Synchronized Vercel project configuration with GitHub Actions by pulling environment settings directly through vercel pull, ensuring that the CI environment used the same deployment configuration as Vercel.
    * Introduced artifact storage using actions/upload-artifact and actions/download-artifact, allowing deployment jobs to reuse the exact build generated and validated during CI.
    * Archived the generated .vercel directory and restored it in deployment jobs before executing Vercel deployment commands with the --prebuilt flag.
    * Configured GitHub Environment URLs for both Preview and Production deployments, making deployment links visible directly from GitHub’s deployment interface.

- **What I learned:**
    * Learned how GitHub Actions jobs are fully isolated and require artifacts or external storage to share build results between stages.
    * Gained practical experience with Vercel’s prebuilt deployment workflow and the .vercel/output deployment architecture.
    * Improved understanding of environment synchronization between GitHub Actions and Vercel projects.
    * Learned how GitHub Environments can be used to track deployment history and expose deployment URLs directly inside the repository interface.
    * Better understood how artifact-based CI/CD pipelines improve reliability by ensuring that the exact tested build is the one being deployed.

- **Plans:** Continue improving deployment automation, explore advanced GitHub Actions optimization techniques, and investigate more sophisticated DevOps practices such as reusable workflows, caching strategies, and deployment approvals.

- **Time spent:** 10 hours.