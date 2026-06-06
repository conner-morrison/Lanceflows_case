// Per-case "finally implemented architecture" graphs, rendered by case-detail.html.
// Each diagram is hand-authored from the case's solution, key implementations,
// and tech stack so it reflects that specific system.
//
//   node = [id, label, icon, color, col, row]      (col/row place it on a grid; decimals allowed)
//   edge = [from, to, label?, 'dash'?]             (arrow from→to, optional mid-label, optional dashed)
const _C = {
  web:   '#2563ff', // client / presentation
  app:   '#7c3aed', // application / API
  ai:    '#0d9488', // AI / intelligence
  data:  '#1f9d57', // data / storage
  flow:  '#e8821e', // cache / stream / events
  infra: '#5b6b8c', // edge / cloud / infrastructure
  sec:   '#c0455f', // security / alerting
  ext:   '#334155'  // external / third-party system
};

const CASE_ARCH = {
  'medplum-fhir': {
    nodes: [
      ['portal', 'Patient Portal',       '📱', _C.web,   0, 1.0],
      ['dash',   'Clinician Dashboard',  '🖥️', _C.web,   0, 2.4],
      ['oauth',  'OAuth2 HIPAA Consent', '🔐', _C.sec,   1, 0.0],
      ['api',    'Node.js API',          '⚙️', _C.app,   1, 1.7],
      ['fhir',   'Medplum FHIR Server',  '🏥', _C.ai,    2, 1.7],
      ['hl7',    'HL7→FHIR Translator',  '🔁', _C.ai,    2, 3.1],
      ['db',     'PostgreSQL (FHIR)',    '🗄️', _C.data,  3, 1.7],
      ['ecs',    'AWS ECS / Docker',     '☁️', _C.infra, 3, 0.2]
    ],
    edges: [
      ['portal','api'], ['dash','api'], ['oauth','api','consent'],
      ['api','fhir'], ['fhir','db'], ['hl7','fhir','sync'],
      ['ecs','api','deploy','dash']
    ]
  },

  'formance-ledger': {
    nodes: [
      ['web',    'Dispute Dashboard',   '🖥️', _C.web,  0, 0.6],
      ['gw',     'Payment Gateways',    '💳', _C.flow, 0, 2.4],
      ['ledger', 'Go Ledger Engine',    '⚙️', _C.app,  1, 1.5],
      ['split',  'Payment Split Service','🧮', _C.app, 1, 3.0],
      ['kafka',  'Kafka Event Stream',  '🔀', _C.flow, 2, 0.4],
      ['db',     'PostgreSQL Ledger',   '🗄️', _C.data, 2, 1.9],
      ['click',  'ClickHouse Analytics','📊', _C.data, 3, 1.0]
    ],
    edges: [
      ['web','ledger'], ['gw','ledger','payments'], ['split','ledger'],
      ['ledger','kafka','events'], ['ledger','db'],
      ['kafka','click','stream'], ['db','click']
    ]
  },

  'fleetbase-logistics': {
    nodes: [
      ['ops',    'Ops Console',          '🖥️', _C.web,  0, 0.8],
      ['driver', 'Driver App',           '📱', _C.web,  0, 2.2],
      ['iot',    'IoT GPS / Temp Sensors','📡', _C.flow,0, 3.6],
      ['ws',     'WebSocket Gateway',    '🔌', _C.app,  1, 0.0],
      ['api',    'Node.js API',          '⚙️', _C.app,  1, 2.2],
      ['redis',  'Redis Live State',     '⚡', _C.flow, 2, 0.9],
      ['db',     'PostgreSQL',           '🗄️', _C.data, 2, 2.4],
      ['alert',  'Warehouse Alert Engine','🚨', _C.sec, 3, 1.5]
    ],
    edges: [
      ['ops','api'], ['driver','api'], ['iot','api','telemetry'],
      ['api','redis'], ['api','db'], ['api','ws'],
      ['ws','ops','live'], ['redis','alert'], ['alert','ops','alerts']
    ]
  },

  'estated-proptech': {
    nodes: [
      ['web',    'Valuation Portal',     '🖥️', _C.web,  0, 1.0],
      ['mls',    'MLS / Listings Feed',  '🏘️', _C.ext,  0, 2.8],
      ['rails',  'Rails API',            '⚙️', _C.app,  1, 1.9],
      ['lambda', 'AWS Lambda Valuation', '🧮', _C.flow, 2, 0.7],
      ['gis',    'PostGIS Geospatial',   '🗺️', _C.data, 2, 3.0],
      ['db',     'PostgreSQL',           '🗄️', _C.data, 3, 1.9]
    ],
    edges: [
      ['web','rails'], ['mls','rails','sync'], ['rails','lambda','valuation'],
      ['lambda','db'], ['rails','db'], ['gis','rails','geo']
    ]
  },

  'duffel-travel': {
    nodes: [
      ['web',  'Booking UI',         '🖥️', _C.web,   0, 0.8],
      ['edge', 'Vercel Edge',        '🌐', _C.infra, 0, 2.2],
      ['gql',  'GraphQL Gateway',    '🔷', _C.app,   1, 1.5],
      ['svc',  'Go Booking Service', '⚙️', _C.app,   2, 1.5],
      ['air',  'Airline / GDS APIs', '✈️', _C.ext,   2, 3.0],
      ['redis','Redis Fare Cache',   '⚡', _C.flow,  3, 0.4],
      ['db',   'Bookings DB',        '🗄️', _C.data,  3, 2.0]
    ],
    edges: [
      ['web','gql'], ['edge','gql','CDN'], ['gql','svc'],
      ['svc','air','search'], ['svc','redis','cache'], ['svc','db']
    ]
  },

  'boost-insurtech': {
    nodes: [
      ['portal','Policyholder Portal',   '🖥️', _C.web,   0, 1.0],
      ['flask', 'Flask Underwriting API','⚙️', _C.app,   1, 1.6],
      ['risk',  'Risk Scoring Engine',   '📐', _C.app,   2, 0.4],
      ['db',    'PostgreSQL Policies',   '🗄️', _C.data,  2, 1.9],
      ['pdf',   'PDF Policy Generator',  '📄', _C.infra, 1, 3.0],
      ['s3',    'AWS S3 Documents',      '🪣', _C.data,  3, 2.6]
    ],
    edges: [
      ['portal','flask'], ['flask','risk','assess'], ['risk','db'],
      ['flask','db'], ['flask','pdf','generate'], ['pdf','s3']
    ]
  },

  'heidihealth-ai': {
    nodes: [
      ['app',   'Clinician App',     '🖥️', _C.web,  0, 0.8],
      ['audio', 'WebAudio Capture',  '🎙️', _C.web,  0, 2.2],
      ['api',   'Node.js API',       '⚙️', _C.app,  1, 1.5],
      ['genai', 'Google GenAI Scribe','🧠', _C.ai,  2, 1.5],
      ['s3',    'S3 Audio / Notes',  '🪣', _C.data, 3, 0.6],
      ['ehr',   'EHR Export',        '🏥', _C.ext,  3, 2.4]
    ],
    edges: [
      ['app','api'], ['audio','api','stream'], ['api','genai','voice'],
      ['genai','s3'], ['genai','api','notes'], ['api','ehr','export']
    ]
  },

  'harvey-legal': {
    nodes: [
      ['web',   'Legal Workspace',       '🖥️', _C.web,  0, 1.0],
      ['docs',  'Legal Document Corpus', '📚', _C.ext,  0, 3.0],
      ['api',   'FastAPI Service',       '⚙️', _C.app,  1, 1.6],
      ['embed', 'Embedding Pipeline',    '🔢', _C.ai,   1, 3.0],
      ['rag',   'RAG Orchestrator (LLM)','🧠', _C.ai,   2, 1.6],
      ['vec',   'pgvector Index',        '📐', _C.data, 3, 0.7],
      ['db',    'PostgreSQL Docs',       '🗄️', _C.data, 3, 2.5]
    ],
    edges: [
      ['web','api'], ['api','rag'], ['rag','vec','retrieve'],
      ['rag','db'], ['docs','embed','ingest'], ['embed','vec'],
      ['rag','api','answer']
    ]
  },

  'lago-billing': {
    nodes: [
      ['portal','Billing Portal',     '🖥️', _C.web,  0, 0.8],
      ['meter', 'GPU Usage Events',   '📈', _C.flow, 0, 2.6],
      ['rails', 'Rails Billing API',  '⚙️', _C.app,  1, 1.4],
      ['kafka', 'Kafka Ingestion',    '🔀', _C.flow, 2, 0.3],
      ['agg',   'Metering Aggregator','🧮', _C.app,  2, 2.0],
      ['redis', 'Redis Counters',     '⚡', _C.flow, 3, 0.6],
      ['db',    'PostgreSQL Invoices','🗄️', _C.data, 3, 2.2]
    ],
    edges: [
      ['portal','rails'], ['meter','kafka','usage'], ['kafka','agg'],
      ['agg','redis'], ['agg','db'], ['rails','agg'], ['rails','db']
    ]
  },

  'hatchways-proptech': {
    nodes: [
      ['web',   'Appraisal Portal',        '🖥️', _C.web,  0, 1.0],
      ['api',   'Express API',             '⚙️', _C.app,  1, 1.5],
      ['queue', 'Appraisal Workflow Queue','📋', _C.flow, 1, 3.0],
      ['prisma','Prisma ORM',              '🔗', _C.app,  2, 0.5],
      ['s3',    'S3 Reports / Photos',     '🪣', _C.data, 2, 2.4],
      ['db',    'PostgreSQL',              '🗄️', _C.data, 3, 0.8]
    ],
    edges: [
      ['web','api'], ['api','prisma'], ['prisma','db'],
      ['api','s3','uploads'], ['queue','api']
    ]
  },

  'sojern-hospitality': {
    nodes: [
      ['dash',   'Incentive Dashboard',    '🖥️', _C.web,  0, 0.8],
      ['sojern', 'Sojern Intent API',      '🌐', _C.ext,  0, 2.6],
      ['py',     'Python Service · Cloud Run','⚙️', _C.app, 1, 1.6],
      ['intent', 'Traveler Intent Scoring','🧠', _C.ai,   2, 0.5],
      ['click',  'ClickHouse Analytics',   '📊', _C.data, 3, 0.7],
      ['db',     'PostgreSQL',             '🗄️', _C.data, 2, 2.4]
    ],
    edges: [
      ['dash','py'], ['sojern','py','intent data'], ['py','intent'],
      ['intent','click'], ['py','db']
    ]
  }
};
