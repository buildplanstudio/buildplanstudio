import ServiceGroups from "../components/ServiceGroups.jsx";

export default function Services() {
  return (
    <div className="container page-pad">
      <h1>Our services</h1>
      <p className="section-lead">
        You only share the ideas. Our in-house team produces the plan, 3D visualisation and supporting material.
      </p>
      <ServiceGroups />
    </div>
  );
}
