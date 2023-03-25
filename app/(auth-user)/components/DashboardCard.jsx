const DashboardCard = ({ children, title, items = 0 }) => {
  return (
    <div className="bg-white  rounded-md py-4 px-6">
      <div className="flex justify-between items-center text-black-100/75 pb-3">
        <h1>{title}</h1>
        <p>Item - {items}</p>
      </div>
      {children}
    </div>
  );
};

export default DashboardCard;
