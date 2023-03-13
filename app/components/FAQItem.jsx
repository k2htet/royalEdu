const FAQItem = ({ title, des, id }) => {
  return (
    <div
      tabIndex={0}
      className={`collapse ${
        id === 1 && "collapse-open"
      } collapse-arrow  font-myanmar bg-primary rounded-md border-0`}
    >
      <div className="collapse-title text-xl text-white text-h6 p-4">
        {title}
      </div>
      <div className="collapse-content text-black-100 bg-background">
        <p className="py-4">{des}</p>
      </div>
    </div>
  );
};

export default FAQItem;
