import type { Project } from '../types'
import { Figure } from '../components'
import takeoffArea from '../../assets/portfolio/algobrick/takeoff-area.jpg'
import takeoffCount from '../../assets/portfolio/algobrick/takeoff-count.jpg'
import takeoffLines from '../../assets/portfolio/algobrick/takeoff-lines.jpg'
import vendorImport from '../../assets/portfolio/algobrick/vendor-import.jpg'
import vendorsQuotes from '../../assets/portfolio/algobrick/vendors-quotes.jpg'
import estimate from '../../assets/portfolio/algobrick/estimate.jpg'

// ROUGH DRAFT, written from the walkthrough recording alone (it has no narration).
// TODO: add the date, your role, the team, the tech stack and any results.
// TODO: add the walkthrough video once it's hosted (e.g. YouTube); the raw recording is too big for the repo.
const algobrick: Project = {
  slug: 'algobrick',
  title: 'AlgoBrick',
  kicker: 'Construction Estimating',
  summary:
    'A web tool that takes a construction estimator from measuring quantities on site-plan PDFs to a priced estimate built from real vendor quotes.',
  tags: ['Takeoff', 'Estimating', 'Vendor Pricing'],
  thumbnail: takeoffLines,
  thumbnailAlt: 'Storm drain lines traced over a civil site plan',

  problem: {
    intro: (
      <>
        <p>
          Before a contractor can bid on a job, an estimator has to work out exactly what the job needs: how many
          square feet of bio-retention area, how many storm drain inlets and manholes, how many linear feet of pipe.
          That &ldquo;takeoff&rdquo; is usually done by hand, measuring off PDF plan sheets, and the quantities then
          get priced by cross-referencing spreadsheets of vendor quotes.
        </p>
        <p>
          It's slow, repetitive work spread across several tools, and a missed inlet or a mis-scaled measurement flows
          straight into the bid. AlgoBrick brings it into one flow: <strong>Takeoff</strong>, then{' '}
          <strong>Estimate</strong>, then <strong>Bid Package</strong>.
        </p>
      </>
    ),
  },

  artifacts: {
    intro: <p>A walkthrough of the tool on a real civil site plan, drawn at 1&Prime; = 20&prime;.</p>,
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
          </>
        ),
      },
      {
        id: 'takeoff-counts',
        title: 'Takeoff: counts and a shared legend',
        content: (
          <>
            <p>
              Every takeoff belongs to a legend label (Bio Retention Area, Storm Drain Inlet, Storm Drain Manhole,
              Storm Drain Line), so quantities group themselves as you work. The Count tool drops markers for discrete
              items like inlets and manholes, and the Takeoffs panel tracks each one with an approval state.
            </p>
            <Figure
              width={1400}
              height={741}
              src={takeoffCount}
              alt="Count markers on storm drain inlets, with the legend and takeoffs panel"
              caption="Counting storm drain inlets against the legend."
            />
          </>
        ),
      },
      {
        id: 'takeoff-lines',
        title: 'Takeoff: lines that join up',
        content: (
          <>
            <p>
              Pipe runs are measured with the Line tool. Separate segments can be welded at their endpoints and
              combined into one run with a single total length, so a storm drain line that crosses several drawings
              still counts once.
            </p>
            <Figure
              width={1400}
              height={741}
              src={takeoffLines}
              alt="Storm drain line segments highlighted on the plan, listed with their lengths"
              caption="Storm drain lines measured across the sheet, with lengths in the Takeoffs panel."
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
              src={vendorImport}
              alt="Import vendor pricing dialog mapping workbook sheets and columns"
              caption="Mapping a vendor workbook's sheets and columns."
            />
            <p>
              Imported materials are matched to legend groups by CSI code, so each takeoff line knows which vendor
              items can price it.
            </p>
            <Figure
              width={1400}
              height={741}
              src={vendorsQuotes}
              alt="Vendors and quotes tab listing legend groups by CSI code and a vendor's price list"
              caption="Vendors & Quotes: legend groups matched to CSI codes, and the imported price list."
            />
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
          Most of the interface decisions came down to keeping an estimator in flow on a dense drawing: every tool has
          on-canvas hints (Enter to finish, Esc to cancel), and quantities update live in the side panel instead of on
          a separate screen.
        </p>
        <p>
          Anything the tool detects or derives stays pending until a person approves it. In bidding, a wrong number is
          expensive, so the tool speeds up the takeoff without taking the estimator's judgement out of it.
        </p>
      </>
    ),
  },
}

export default algobrick
