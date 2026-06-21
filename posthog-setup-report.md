<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the Skild TanStack Start application. Changes include:

- **PostHog client-side SDK** initialized via `PostHogProvider` (from `posthog-js/react`) in `src/routes/__root.tsx`, wrapping the entire app so all routes have access to analytics.
- **Reverse proxy** configured in `vite.config.ts` to route `/ingest` requests through the Vite dev server, improving reliability and avoiding CORS issues.
- **User identification** via Clerk auth: a `PostHogUserIdentifier` component in `__root.tsx` calls `posthog.identify()` using the Clerk `useUser()` hook whenever a user is signed in, associating their email, name, and Clerk user ID across sessions.
- **Server-side PostHog client** created at `src/utils/posthog-server.ts` as a singleton using `posthog-node`, ready to be used in future API routes.
- **Event tracking** added across 4 files covering the core user flows: home page CTAs, skill card interactions, and auth page views.

| Event Name | Description | File |
|---|---|---|
| `browse_registry_clicked` | User clicked the 'Browse Registry' CTA on the home page | `src/routes/index.tsx` |
| `publish_skill_clicked` | User clicked the 'Publish Skill' CTA on the home page | `src/routes/index.tsx` |
| `skill_install_command_copied` | User copied the install command for a skill from the skill card | `src/components/SkillCard.tsx` |
| `skill_opened` | User clicked 'Open' to navigate to a skill's detail page | `src/components/SkillCard.tsx` |
| `sign_in_page_viewed` | User landed on the sign-in page (top of auth funnel) | `src/routes/__auth/sign-in.$.tsx` |
| `sign_up_page_viewed` | User landed on the sign-up page (top of registration funnel) | `src/routes/__auth/sign-up.$.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/246055/dashboard/1740869)
- [Skill Discovery: Registry & Publish CTAs](https://us.posthog.com/project/246055/insights/Vr4Qvc9C)
- [Skill Install Command Copies](https://us.posthog.com/project/246055/insights/Ub0s2zQk)
- [Auth Funnel: Sign-in vs Sign-up views](https://us.posthog.com/project/246055/insights/cMvqEC00)
- [Discovery-to-Install Funnel](https://us.posthog.com/project/246055/insights/iRyDjXWE)
- [Skill Engagement Over Time](https://us.posthog.com/project/246055/insights/ItRkwfGD)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — the `PostHogUserIdentifier` component identifies on every render when Clerk reports a signed-in user, but verify this works correctly for users who return to the app already logged in via Clerk's persisted session.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
