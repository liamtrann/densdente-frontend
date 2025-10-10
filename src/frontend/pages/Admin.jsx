import "./admin.css";
import Breadcrumbs from "../../frontend/common/Breadcrumbs";
import Button from "../../frontend/common/Button";
import Card from "../../frontend/common/Card";
import Badge from "../../frontend/common/Badge";
import { Table, THead, Th, TBody, Tr, Td } from "../../frontend/common/Table";
import { Link } from "react-router-dom";

const rows = [
  {
    clinic: "ON-T-EVD",
    prod: "SUBMITTED 4 OF 14 REPORTS",
    prodOk: true,
    col: "NOT SUBMITTED",
    colOk: false,
    fc: "NOT SUBMITTED",
    fcOk: false,
    pts: 0,
  },
  {
    clinic: "ON-C-CWL",
    prod: "NO REPORTS SUBMITTED",
    prodOk: false,
    col: "NOT SUBMITTED",
    colOk: false,
    fc: "NOT SUBMITTED",
    fcOk: false,
    pts: 0,
  },
  {
    clinic: "NS-H-LAC",
    prod: "NO REPORTS SUBMITTED",
    prodOk: false,
    col: "NOT SUBMITTED",
    colOk: false,
    fc: "SUBMITTED",
    fcOk: true,
    pts: 0,
  },
];

export default function Admin() {
  const today = new Date().toLocaleDateString("en-CA");
  return (
    <div className="admin-page">
      {/* Top bar */}
      <div className="topbar">
        <div className="topbar__left">
          <Breadcrumbs
            items={[{ label: "Pages", to: "/" }, { label: "Admin Dashboard" }]}
          />
          <h1 className="topbar__title">Admin Dashboard</h1>
        </div>
        <div className="topbar__right">
          <Button as={Link} to="/scheduling" variant="outline">
            To Scheduling Dashboard
          </Button>
          <Button variant="ghost">Logout</Button>
        </div>
      </div>

      {/* Overview */}
      <div className="section">
        <h2 className="section__title">Overview</h2>
        <div className="grid grid--stats">
          <Card>
            <div className="stat">
              <div className="stat__icon">📅</div>
              <div>
                <div className="muted">Date</div>
                <div className="stat__value">{today}</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="stat">
              <div className="stat__icon">🏭</div>
              <div>
                <div className="muted">Production Report Submissions</div>
                <div className="stat__value">1/40</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="stat">
              <div className="stat__icon">💳</div>
              <div>
                <div className="muted">Collection Report Submissions</div>
                <div className="stat__value">0/40</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="stat">
              <div className="stat__icon">📈</div>
              <div>
                <div className="muted">Forecast Report Submissions</div>
                <div className="stat__value">12/40</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Reporting Status */}
      <div className="section">
        <h2 className="section__title">Reporting Status</h2>
        <Card>
          <Table>
            <THead>
              <Th>Clinic</Th>
              <Th>Practitioner Production Reports</Th>
              <Th>Collection Reports Submitted</Th>
              <Th>Forecast Report Submitted</Th>
              <Th>Number of Patients Submitted</Th>
              <Th>Management Actions</Th>
            </THead>
            <TBody>
              {rows.map((r) => (
                <Tr key={r.clinic}>
                  <Td>{r.clinic}</Td>
                  <Td>
                    <Badge color={r.prodOk ? "success" : "danger"}>
                      {r.prod}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge color={r.colOk ? "success" : "danger"}>
                      {r.col}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge color={r.fcOk ? "success" : "danger"}>{r.fc}</Badge>
                  </Td>
                  <Td>{r.pts}</Td>
                  <Td>
                    <Button variant="outline" size="sm">
                      Go to Clinic Dashboard
                    </Button>

                    <Button as={Link} to="/scheduling" variant="outline">
                      To Scheduling Dashboard
                    </Button>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>

          <div className="pager">
            <span>Page 1 of 4</span>
            <div className="pager__right">
              <label>Go to page:</label>
              <select>
                <option>1</option>
              </select>
              <label>Show</label>
              <select>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
