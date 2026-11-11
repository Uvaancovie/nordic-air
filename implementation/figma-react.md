# Nordic Air — Complete Figma-to-React Implementation

## Objective

Implement the approved Nordic Air aqua-blue brand identity and Figma website designs in the existing repository:

https://github.com/Uvaancovie/nordic-air

Use the existing application as the starting point. Do not create a separate replacement project.

## Existing stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Lucide React icons
- Motion for React where useful

## Design direction

Build a premium, modern HVAC website for Durban, South Africa.

Brand personality:
- Cool, calm, precise and dependable
- Premium without feeling inaccessible
- Clean Scandinavian-inspired layouts
- Realistic air-conditioning product photography
- Strong conversion-focused calls to action

Palette:
- Arctic Navy: `#102D40`
- Ocean Blue: `#168DB8`
- Glacier Aqua: `#42C6D9`
- Ice Blue: `#DDF7F9`
- Background: `#F5FBFC`
- White: `#FFFFFF`
- Muted text: `#607786`

Use Manrope for headings and DM Sans for body text. Remove the old red-and-royal-blue branding consistently.

## Phase 1 — Inspect before editing

1. Inspect all Figma pages, frames, components, variants, text styles, colour variables, image fills, spacing and responsive layouts.
2. Inspect the current repository and preserve existing working functionality.
3. Map each Figma frame to its corresponding React component.
4. Identify missing screens, missing assets, duplicated components and incorrect links.
5. Do not invent content or claim that unverified customer testimonials, certifications, ratings or statistics are real.

## Phase 2 — Implement the complete website

Update and reuse these existing components:

- `Navbar.tsx`
- `Hero.tsx`
- `TrustMetrics.tsx`
- `AboutSection.tsx`
- `NavyFeatures.tsx`
- `ServicesSection.tsx`
- `SizingCalculator.tsx`
- `CaseStudies.tsx`
- `ServiceAreas.tsx`
- `EnergyEstimator.tsx`
- `BrandsSection.tsx`
- `BookingSection.tsx`
- `FaqSection.tsx`
- `Footer.tsx`
- `ServiceModal.tsx`

Create shared reusable components where appropriate, including buttons, section headings, cards, form fields, badges and responsive containers.

Implement the corresponding Figma layouts for:
1. Home page
2. Services page
3. Interactive room-sizing calculator
4. Contact and quote-request experience
5. Website wireframe layouts where required
6. Responsive mobile layouts

If the Figma file includes additional approved screens, implement those too.

## Phase 3 — Homepage and hero

Create a polished hero section with:
- Clear headline and supporting copy
- Primary quote CTA
- Secondary sizing-calculator CTA
- Realistic air-conditioner product photography
- Aqua gradients and subtle atmospheric effects
- Responsive layout with intentional image cropping
- Trust information that is factually verified

Use existing project assets under `public/` where appropriate. Do not generate broken asset paths or use the logo as a product photograph.

## Phase 4 — Interactive functionality

Preserve and test:
- Navigation and mobile menu
- Room dimension inputs and floor-area calculation
- Room-condition selections
- BTU recommendation flow
- Product recommendation and selection
- Pre-filled booking details
- Quote form validation
- WhatsApp quote links
- Phone links
- Service and suburb selection
- Case-study enquiry actions
- FAQ expand/collapse interactions
- Modal keyboard and close behaviour

Sizing recommendations must be clearly labelled as estimates and should not replace a proper site assessment. Do not present an unverified price as a guaranteed quote.

## Phase 5 — Product catalogue

Build reusable product cards supporting:
- Brand and model
- BTU capacity
- Inverter or non-inverter
- Supplied-and-installed price
- Warranty details
- Wi-Fi availability
- Product image
- Quote CTA

Use only confirmed prices and availability. Keep product data in a central typed data file rather than duplicating it throughout the UI.

## Phase 6 — Responsive quality

Ensure layouts work at:
- 360px mobile
- 390px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

Avoid horizontal overflow, tiny mobile controls, clipped headings and oversized hero imagery. Add visible keyboard focus states and accessible labels.

## Phase 7 — Code quality

- Preserve TypeScript types and use semantic HTML.
- Extract repeated styling into reusable components or shared utilities.
- Avoid `any` unless strictly necessary.
- Avoid unnecessary dependencies.
- Do not hard-code sensitive credentials.
- Keep `.env.example` updated if new environment variables are introduced.
- Ensure all buttons perform their intended actions.
- Add meaningful loading, error and success states to forms.
- Ensure external links use appropriate security attributes.
- Do not remove working functionality just to match a screenshot.

## Phase 8 — Verification

Run:

`npm install`

`npm run lint`

`npm run build`

Resolve TypeScript errors and build failures. Test key flows manually and report any integration requiring external credentials or services.

## Deliverables

1. Updated source code in the existing repository.
2. Reusable aqua-blue design system.
3. Implemented Figma layouts.
4. Responsive desktop, tablet and mobile experiences.
5. Working sizing, product selection and enquiry flows.
6. Updated README with setup and deployment instructions.
7. A summary of changed files, verification results and outstanding tasks.

Work incrementally. Inspect the real Figma frames and existing source before making changes. Do not claim a page is implemented or tested unless it actually is.