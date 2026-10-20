import PricingCards from "../components/PricingCards.jsx";

export default function Pricing() {
  return (
    <div className="container page-pad">
      <h1>Pricing</h1>
      <p className="section-lead">
        Sample packages. Large or multi-unit projects get a custom quote — <a href="/contact">contact us</a>.
      </p>
      <PricingCards />
    </div>
  );
}
