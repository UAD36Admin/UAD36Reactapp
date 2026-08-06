import { useState } from 'react';
import logo from './assets/UAD36InitiativeIllustLogoVibrant.png';

const tableSasUrl =
  'https://uad36wsstorage.table.core.windows.net/InterestSubmissions?sp=rau&st=2026-06-03T15:38:00Z&se=2027-12-30T23:53:00Z&spr=https&sv=2026-02-06&sig=KGwLcANOXD3FmtBirj%2FvW%2BxmLsy79I6YAcFsDtSccrA%3D&tn=InterestSubmissions';

function createEntity(formValues) {
  return {
    PartitionKey: 'Interest',
    RowKey: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    FirstName: formValues.firstName,
    LastName: formValues.lastName,
    Email: formValues.email,
    Phone: formValues.phone,
    City: formValues.city,
    State: formValues.state,
    Organization: formValues.organization,
    Role: formValues.role,
    Discipline: formValues.discipline,
    AdditionalInfo: formValues.additionalInfo
  };
}

export default function App() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    organization: '',
    role: '',
    discipline: '',
    additionalInfo: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'pending', message: 'Saving interest submission...' });

    const entity = createEntity(formValues);

    try {
      const response = await fetch(tableSasUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json;odata=nometadata',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status} ${response.statusText}: ${errorText}`);
      }

      setStatus({ type: 'success', message: 'Thank you for your interest.' });
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        organization: '',
        role: '',
        discipline: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error(error);
      setStatus({
        type: 'error',
        message: `Unable to save to Azure Table Storage. Check browser console and CORS settings. ${error?.message ?? ''}`
      });
    }
  };

  return (
    <div className="page-shell">
      <div
  style={{ textAlign: 'center', paddingBottom: '20px' }}
  className="logo"
>
  <img
    style={{ height: '280px' }}
    src={logo}
    alt="UAD 3.6 Production Incubation Initiative Logo"
  />
</div>

      <header className="hero">
        <h1>UAD 3.6 Production Incubation Initiative</h1>
        <p>A voluntary, practitioner driven movement accelerating Mortgage Banking scale readiness for UAD 3.6 Appraisal use.</p>
        <p>Participants gain real production experience to build scale readiness before the October UAD 3.6 cutover (Yes…the Order cutover is in October).</p>
        <p>No hierarchy. No membership fees. No formal program.<br />Just coordinated action, shared learning, and concentrated production.</p>
        <a className="cta-link" href="#interest-form">Join the Initiative →</a>
      </header>

      <main>
        <section>
          <h2>A Voluntary, Ecosystem‑Wide Collaboration</h2>
          <p>The UAD 3.6 Production Incubation Initiative brings together lenders, appraisers, AMCs, software vendors, Continuing Education providers, and professional organizations to accelerate scale readiness for the modernized URAR.</p>
          <p>This is not a program, pilot, or sponsored rollout. It is a production‑focused, practitioner‑led effort to generate enough real production experience to replace uncertainty with clarity.</p>
          <h3>Our Purpose</h3>
          <ul>
            <li>Create focused UAD 3.6 production experience to reach near‑normalization</li>
            <li>Surface workflow, policy, and technology impacts early</li>
            <li>Reduce industry‑wide FUD (fear, uncertainty, doubt)</li>
            <li>Cohort‑incubated scale readiness steppingstones for national rollouts</li>
            <li>Share ecosystem best practices across cohorts</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>How It Works</h2>
          <h3>Regional Cohorts</h3>
          <p>The Initiative operates nationally, but production activity happens locally through Cohorts — voluntary regional groupings of practitioners and infrastructure providers.</p>
          <p><strong>Examples:</strong></p>
          <ul>
            <li>Mid Atlantic Cohort</li>
            <li>South Central Cohort</li>
            <li>Gulf States Cohort</li>
            <li>Pacific Northwest Cohort</li>
            <li>Rocky Mountain Cohort</li>
            <li>Midwest Cohort</li>
            <li>New England Cohort</li>
            <li>Tri States Cohort</li>
          </ul>
          <p><strong>Each Cohort is comprised of:</strong></p>
          <ul>
            <li>Focus Appraisers (2–3 initial per market)</li>
            <li>Lender/AMC Practitioners</li>
            <li>Infrastructure Provider Participants</li>
          </ul>
          <h3>Why Cohorts Work</h3>
          <p>Focused assignments generate 8–10 UAD 3.6 assignments in 2 months, creating:</p>
          <ul>
            <li>Reliable appraisal development rhythm and realistic turn time and fee structure expectations</li>
            <li>Clear training and operational adjustments for lenders and AMCs</li>
            <li>Actionable feedback for infrastructure participants fueling innovation</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Who Participates</h2>
          <h3>Practitioners</h3>
          <ul>
            <li>Appraisers</li>
            <li>Lenders</li>
            <li>AMCs</li>
            <li>Brokers</li>
          </ul>
          <h3>Infrastructure Providers</h3>
          <ul>
            <li>GSEs (de facto)</li>
            <li>Appraisal software vendors</li>
            <li>Order management systems</li>
            <li>LOS/POS/CRM platforms</li>
            <li>PropTech vendors</li>
            <li>Professional organizations</li>
          </ul>
          <h3>Coordinating Participants</h3>
          <p>Volunteers who socialize, connect, and steady participation within their networks.</p>
        </section>

        <hr />

        <section>
          <h2>Why This Matters</h2>
          <p>The UAD 3.6 transition becomes operationally effective October 15, 2026, with legacy numbered forms acceptance ending November 2, 2026.</p>
          <p>The industry needs:</p>
          <ul>
            <li>Real production volume</li>
            <li>Real workflow signals</li>
            <li>Real operational adjustments</li>
            <li>Real training materials</li>
            <li>Real readiness</li>
          </ul>
          <p>The Initiative creates a low‑pressure, high‑support environment for converting experience into scale readiness.</p>
        </section>

        <hr />

        <section>
          <h2>How to Participate</h2>
          <h3>Lenders</h3>
          <ul>
            <li>Identify an initial cohort to engage local practitioners</li>
            <li>Start with 1–2 loan teams in a single market</li>
            <li>Order “easy” assignments</li>
            <li>Learn, refine, repeat</li>
            <li>Increase assignment complexities, loan teams, markets, and cohorts</li>
          </ul>
          <h3>Appraisers</h3>
          <ul>
            <li>Become “Ready, Willing, and Able” to develop UAD 3.6 Appraisals</li>
            <li>Activate your knowledge as a focus appraiser</li>
            <li>Socialize the initiative within your client networks</li>
            <li>Develop and provide thought leadership with participants and clients</li>
          </ul>
          <h3>AMCs</h3>
          <ul>
            <li>Encourage tech stack “module” workflow if not fully tech stack ready</li>
            <li>Support client lender and appraiser scale readiness development</li>
            <li>Track and isolate workflow friction</li>
            <li>Help refine continuous improvement</li>
          </ul>
          <h3>Technology Vendors</h3>
          <ul>
            <li>Monitor real production signals to improve and innovate</li>
            <li>Refine workflows, enhance functionality, and extend digital workflow</li>
            <li>Support practitioners directly through training and active support</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>Frequently Asked Questions</h2>
          <h3>Is this a formal program?</h3>
          <p>No. It is a voluntary, practitioner‑driven initiative. No fees, no hierarchy, no sponsorship.</p>
          <h3>Do I need special approval to participate?</h3>
          <p>No. Participation is open to any lender, appraiser, AMC, or vendor willing to engage constructively. Focus appraiser counts will be constrained to yield 8–10 assignments quickly.</p>
          <h3>Is this a pilot?</h3>
          <p>No. Pilots imply formal oversight and evaluation. This is a user‑group‑style “fiercely independent collaboration.”</p>
          <h3>How do Cohorts form?</h3>
          <p>Through activity. Local practitioners activate others in their geography and a Cohort emerges.</p>
          <h3>Who leads the Initiative?</h3>
          <p>No one “leads” it, but everyone does. Coordinators help socialize, connect, and steady participation — but do not own or direct it.</p>
          <h3>Is there a cost?</h3>
          <p>No. Participation is voluntary.</p>
          <h3>Can organizations join as Infrastructure Providers?</h3>
          <p>Yes — ecosystem participants like appraisal software vendors, OMS platforms, LOS/POS/CRM providers, CE training partners, and professional organizations are welcome.</p>
        </section>

        <hr />

        <section>
          <h2>Participating Organizations</h2>
          <h3>Infrastructure Providers</h3>
          
          <ul>
    <li>
    <a href="https://aimsdashboard.com/" target="_blank">
        AIMSdashboard
    </a>
</li>

<li>
    <a href="https://www.aivre.com/" target="_blank">
        Aivre
    </a>
</li>

<li>
    <a href="https://avsociety.org/" target="_blank">
        American Valuation Society
    </a>
</li>

<li>
    <a href="https://appraiserelearning.com/" target="_blank">
        Appraiser eLearning
    </a>
</li>

<li>
    <a href="https://www.appraiz.biz/" target="_blank">
        ApprAIz
    </a>
</li>

<li>
    <a href="https://www.asteroom.com/" target="_blank">
        Asteroom
    </a>
</li>

<li>
    <a href="https://www.automax.ai/" target="_blank">
        AutoMax
    </a>
</li>



<li>
    <a href="https://bradfordsoftware.com/" target="_blank">
        Bradford Technologies
    </a>
</li>

<li>
    <a href="https://www.alamode.com/" target="_blank">
        Cotality / TOTAL
    </a>
</li>
<li>
    <a href="https://fdiconsultants.com/" target="_blank">
        FDI Executive Consultants
    </a>
</li>

<li>
    <a href="https://freedomappraise.com/" target="_blank">
        FreedomAppraise
    </a>
</li>

<li>
    <a href="https://www.homevision.co/" target="_blank">
        HomeVision
    </a>
</li>

<li>
    <a href="https://restb.ai/" target="_blank">
        RestB.ai
    </a>
</li>

<li>
    <a href="https://sfrep.com/" target="_blank">
        SFREP
    </a>
</li>

<li>
    <a href="https://www.txvaluepro.com/" target="_blank">
        Texas Valuation Professionals
    </a>
</li>

<li>
    <a href="https://www.ncpac.us/" target="_blank">
        The North Carolina Professional Appraisers Coalition
    </a>
</li>



<li>
    <a href="https://www.valligent.com/" target="_blank">
        Valligent
    </a>
</li>

<li>
    <a href="https://www.veros.com/" target="_blank">
        Veros
    </a>
</li>   

    <li>Additional participants as they join</li>
</ul>
          <h3>Practitioner Organizations</h3>
          <ul>
            <li>Lenders</li>
            <li>AMCs</li>
            <li>Professional associations</li>
            <li>Regional appraiser groups</li>
          </ul>
        </section>

        <hr />

        <section id="interest-form" className="form-card">
          <h2>Join the UAD 3.6 Production Incubation Initiative</h2>
          <p>If you’re curious or you’d like to participate as a practitioner or infrastructure provider, share your information below.</p>

          <form onSubmit={handleSubmit}>
            <div className="field-row">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" value={formValues.firstName} onChange={handleChange} required />
            </div>

            <div className="field-row">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" value={formValues.lastName} onChange={handleChange} required />
            </div>

            <div className="field-row">
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" value={formValues.email} onChange={handleChange} required />
            </div>

            <div className="field-row">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel" value={formValues.phone} onChange={handleChange} />
            </div>

            <div className="field-row">
              <label htmlFor="city">City</label>
              <input id="city" name="city" value={formValues.city} onChange={handleChange} />
            </div>

            <div className="field-row">
              <label htmlFor="state">State</label>
              <input id="state" name="state" value={formValues.state} onChange={handleChange} />
            </div>

            <div className="field-row">
              <label htmlFor="organization">Organization</label>
              <input id="organization" name="organization" value={formValues.organization} onChange={handleChange} />
            </div>

            <div className="field-row">
              <label htmlFor="role">Role/Title</label>
              <input id="role" name="role" value={formValues.role} onChange={handleChange} />
            </div>

            <div className="field-row">
              <label htmlFor="discipline">Industry Discipline</label>
              <select id="discipline" name="discipline" value={formValues.discipline} onChange={handleChange} required>
                <option value="">Select one</option>
                <option value="Lender">Lender</option>
                <option value="Professional Organization">Professional Organization</option>
                <option value="Industry Discipline">Industry Discipline</option>
                <option value="Appraiser">Appraiser</option>
                <option value="AMC">AMC</option>
                <option value="Technology Vendor">Technology Vendor</option>
                <option value="Education Provider">Education Provider</option>
                <option value="Service Provider">Service Provider</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="field-row full-width">
              <label htmlFor="additionalInfo">Additional Info</label>
              <textarea id="additionalInfo" name="additionalInfo" value={formValues.additionalInfo} onChange={handleChange} rows="4" />
            </div>

            <button type="submit">Submit Interest</button>
          </form>

          {status ? (
            <div className={`status-message ${status.type}`}>{status.message}</div>
          ) : null}
        </section>
      </main>

      <footer>
        <p>UAD 3.6 Production Incubation Initiative<br />A voluntary, practitioner‑driven collaboration accelerating readiness for the modernized URAR.</p>
      </footer>
    </div>
  );
}
