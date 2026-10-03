import { faGithub } from '@fortawesome/free-brands-svg-icons'
import type { Project } from '../types'
import { Figure, YouTube } from '../components'
import userFlowDiagram from '../../assets/portfolio/trip-agenda/user-flow-diagram.png'

// Content carried over from the old site's TripAgenda page, re-sorted into the three sections.
const tripAgenda: Project = {
  slug: 'trip-agenda',
  title: 'Software Engineering Capstone: TripAgenda',
  kicker: 'Android App',
  date: '2025-10-30',
  summary:
    'An Android vacation planner with Google ML Kit ticket scanning, offline storage and Google Cloud API integration.',
  tags: ['Android', 'Kotlin', 'Google Cloud', 'Google ML Kit'],
  thumbnail: userFlowDiagram,
  thumbnailAlt: "TripAgenda's screen flow, split between Views and Compose",
  links: [{ label: 'GitHub', href: 'https://github.com/KN1GHTL1GHT/VacationPlannerPatki', icon: faGithub }],

  problem: {
    intro: (
      <p>
        The biggest issue with vacations is the complexity of remembering times, dates, and locations as well as
        wrangling tickets. Once on a vacation in a foreign land, you are dependent on your own wits and research. This
        vacation companion app is designed to establish a safety net for you, the traveler, with simple and
        frictionless organization and data entry. Offline storage of critical documents ensures peace of mind when
        connectivity is unreliable.
      </p>
    ),
  },

  artifacts: {
    subsections: [
      {
        id: 'key-features',
        title: 'Key features',
        content: (
          <ul>
            <li>Store up to 50 unique vacations with 99 trip elements each (accommodations, travel, activities)</li>
            <li>Seamless ticket entry using text recognition</li>
            <li>Travel distance calculator</li>
            <li>Share a full itinerary easily</li>
            <li>Notification and alarm system</li>
          </ul>
        ),
      },
      {
        id: 'ticket-scanner',
        title: 'Ticket scanner demo',
        content: <YouTube id="pGnrgVfJyG4" title="TripAgenda ticket scanner demo" />,
      },
      {
        id: 'technical-overview',
        title: 'Technical overview',
        content: (
          <>
            <Figure
              width={1600}
              height={900}
              src={userFlowDiagram}
              alt="Screen flow: MainActivity and trip screens in Views; camera, gallery and ticket scanning in Compose"
              caption="Screen flow, split between the Views (red) and Compose (blue) frameworks."
            />
            <p>
              The app is split into two frameworks, Views and Compose. In the Views framework, all database CRUD
              operations and vacations and trip elements are managed. Google API integrations are also on this side of
              the app, which uses traditional XML layouts for its interface. The Compose framework integrates CameraX
              and Google ML Kit text recognition. Ticket scanning is implemented through a ViewModel, and photos taken
              are saved and accessible through the GalleryActivity.
            </p>
          </>
        ),
      },
      {
        id: 'technology-stack',
        title: 'Technology stack',
        content: (
          <ul>
            <li>
              <strong>Language:</strong> Kotlin
            </li>
            <li>
              <strong>UI frameworks:</strong> Android Views (XML layouts) and Jetpack Compose
            </li>
            <li>
              <strong>Camera &amp; ML:</strong> CameraX, Google ML Kit (Text Recognition)
            </li>
            <li>
              <strong>APIs:</strong> Google Cloud Platform APIs
            </li>
            <li>
              <strong>Storage:</strong> Room database for offline persistence
            </li>
            <li>
              <strong>Architecture:</strong> MVVM with ViewModels
            </li>
          </ul>
        ),
      },
      {
        id: 'testing',
        title: 'Testing',
        content: (
          <>
            <p>
              The app has 7 testing classes, with a maximum data volume of 14,850 trip elements. The full app is on
              GitHub (linked at the top of this page). My Google API key isn't included there, so some features are
              unavailable in that build.
            </p>
            <p>
              For access to the app's internal testing track, send me a valid Google Play account email on LinkedIn.
            </p>
          </>
        ),
      },
    ],
  },

  reflection: {
    // TODO: rough draft, rewrite in your own words.
    intro: (
      <>
        <p>
          The biggest design decision was splitting the app across two UI frameworks. Keeping the data-heavy screens in
          Views let me lean on familiar XML layouts and Room, while Compose made the camera and text-recognition flow
          much simpler to build around a ViewModel.
        </p>
        <p>
          Building for unreliable connectivity shaped the data model: everything a traveler needs is stored locally
          first, and the cloud APIs add convenience on top rather than being required.
        </p>
      </>
    ),
  },
}

export default tripAgenda
