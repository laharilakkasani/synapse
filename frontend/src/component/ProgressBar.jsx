const ProgressBar = ({ current, total }) => {
  const percent = (current / total) * 100;

  return (
    <div className="progress mb-3 bg-purple-500">
      <div
        className="progress-bar"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;