import type { Project } from '../types'
import { Clip, Figure } from '../components'
import takeoffArea from '../../assets/portfolio/algobrick/takeoff-area.jpg'
import takeoffAddVertex from '../../assets/portfolio/algobrick/takeoff-add-vertex.mp4'
import takeoffAddVertexPoster from '../../assets/portfolio/algobrick/takeoff-add-vertex-poster.jpg'
import vendorsQuotes from '../../assets/portfolio/algobrick/vendors-quotes.jpg'
import estimate from '../../assets/portfolio/algobrick/estimate.jpg'

// ROUGH DRAFT, written from the walkthrough recording alone (it has no narration).
// TODO: add startDate/endDate, your role, the team, the tech stack and any results.
// TODO: add the walkthrough video once it's hosted (e.g. YouTube); the raw recording is too big for the repo.
const algobrick: Project = {
  slug: 'algobrick',
  title: 'UX Engineer @AlgoBrick.ai',
  kicker: 'AI Verification Interface Work',
  startDate: '2026-05-01',
  endDate: '2026-09-06',
  summary:
    'Designing the human review layer for an AI takeoff tool, how I created a review interface for AI output by observing customer usage patterns.',
  tags: ['Startup', 'Construction', 'AI Verification'],
  thumbnail: takeoffAddVertexPoster,
  thumbnailVideo: takeoffAddVertex,
  thumbnailAlt: 'Points being added to a bio-retention area on a civil site plan',

  problem: {
    intro: (
      <>
        <p>
          <strong>Algobrick</strong> is building an AI-assisted takeoff tool for construction estimators.
          A takeoff means measuring everything on a set of blueprints (pipe lengths, paved areas, manhole counts) so a contractor can price a bid. 
        </p>
        <p>
          The original plan was full automation: upload a blueprint, get a finished takeoff. But the AI output was notaccurate enough to run unsupervised, so the company pivoted. A human would review and correct the AI's work, and the product would live or die on how fast that review could happen. I was brought on to fix their first attempt at that review layer.
        </p>
        <p>
          It wasn't close to ready. There was no undo or redo. You couldn't select, delete, or add a single point, so a slightly wrong AI shape had to be redrawn from scratch. Esc confirmed a shape instead of canceling it. And single source of truth issues in the data model caused unpredictable bugs that got in the way of testing at full expert speed.
        </p>
        <p>
          Underneath all of it, the tool ignored how estimators already work. Most of them learned on Bluebeam, the industry standard, and years of use have built habits into their hands, from how they draw shapes to how they move around the blueprint. Algobrick's frontend worked against those expectations at every turn, adding needless friction to every action.
        </p>
      </>
    ),
  },

  artifacts: {
    subsections: [
      {
        id: 'takeoff-areas',
        title: 'Takeoff: measuring areas',
        content: (
          <>
            <p>
              The Area tool traces regions on the plan, by dragging a rectangle or clicking polygon points, with
              vertices that can be edited afterwards and a Cutout tool for holes. Areas are reported in square feet at
              the sheet's scale.
            </p>
            <Figure
              width={1400}
              height={741}
              src={takeoffArea}
              alt="A bio-retention area traced as a polygon on the site plan"
              caption="Tracing the bio-retention area as a polygon."
            />
            {/* 0:57–1:16 of the walkthrough at 1.5x, cropped to the drawing */}
            <Clip
              width={1132}
              height={716}
              src={takeoffAddVertex}
              poster={takeoffAddVertexPoster}
              label="Points being added to the bio-retention area, with dotted lines previewing each new outline"
              caption="Adding points to an existing area: dotted lines preview the new outline before each point is placed."
            />
          </>
        ),
      },
      {
        id: 'vendor-pricing',
        title: 'Importing vendor pricing',
        content: (
          <>
            <p>
              Vendors send prices as Excel workbooks in every shape imaginable. The importer reads the workbook in the
              browser (nothing is uploaded), lets the estimator map which sheet holds vendors, materials and labor and
              which column is which, and flags rows it can't use before importing.
            </p>
            <Figure
              width={1400}
              height={741}
              src={vendorsQuotes}
              alt="Vendors and quotes tab listing legend groups by CSI code and a vendor's price list"
              caption="Vendors & Quotes: legend groups matched to CSI codes, and the imported price list."
            />
            <p>
              Imported materials are matched to legend groups by CSI code, so each takeoff line knows which vendor
              items can price it.
            </p>
          </>
        ),
      },
      {
        id: 'estimate',
        title: 'Building the estimate',
        content: (
          <>
            <p>
              On the Estimate step, every legend group becomes a line item. Detected objects roll up into their line
              and stay pending until approved, and the estimator picks a vendor option for each line, comparing
              material cost, labor, total and lead time. Choosing a vendor adds its material and derives a matching
              install row in Labor, and the running total updates as lines get priced.
            </p>
            <Figure
              width={1400}
              height={741}
              src={estimate}
              alt="Estimate line for storm drain manholes with vendor options and a selected vendor"
              caption="Pricing the storm drain manholes from vendor options."
            />
          </>
        ),
      },
    ],
  },

  reflection: {
    // TODO: rewrite in your own words: what you built, what was hard, what you'd do differently.
    intro: (
      <>
        <p>
          The biggest lesson from Algobrick was how much of expert work runs on muscle memory. An experienced estimator doesn't think about how to draw an area in Bluebeam. Their hands just do it, and their attention stays on the blueprint. When a tool breaks those habits, even in small ways like a hotkey that does the opposite of what's expected, that attention gets pulled back onto the tool itself.
        </p>
        <p>
          That matters more in an AI product, not less. When an AI does the first pass, the human's job becomes verification: scanning the output, catching mistakes, and fixing them. Verification is attention-heavy work. Every bit of mental effort spent fighting the interface is effort not spent noticing that a sewer line is mislabled or too short. A clumsy interface doesn't just slow people down, it makes them worse reviewers.
        </p>
        <p>
          It also changes how people treat the AI. If fixing a mistake costs more than ignoring it, people start accepting output they shouldn't, or they stop trusting the AI and redo everything by hand. Both outcomes defeat the purpose of the product. So my design goal became simple: make correcting the AI cheaper than redrawing, and make it feel like the tool they already know. That's why the label editing feature mattered so much. When the AI traced a shape correctly but labeled it wrong, users could keep the good geometry and fix only the mistake. It's also why the approval step mattered. It made "a human checked this" an explicit action instead of an assumption.
        </p>
        <p>
          This is the same principle that shapes cockpit design and other high-stakes interfaces: when automation does the work, the human becomes the safety check, and the interface's job is to protect their attention. I came in to build a frontend. I left thinking of it as designing the human half of a human-in-the-loop system.
        </p>
      </>
    ),
  },
}

export default algobrick
