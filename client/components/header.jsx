export const Header = ({
  canShowTimer,
  timeLeft,
  canShowScore,
  score,
  canShowHighScore,
  record,
}) => (
  <div className="grid place-items-center gap-4">
    {canShowHighScore && <HighScore record={record} />}
    {canShowTimer && <Timer timeLeft={timeLeft} />}
    {canShowScore && <Score score={score} />}
  </div>
);

export const Timer = ({ timeLeft }) => (
  <div className="bg-red-600 p-4 text-xl rounded-md">
    <p className="text-white">Time Left: {timeLeft}</p>
  </div>
);

export const Score = ({ score }) => (
  <div className="bg-purple-300 px-3 py-2 text-lg rounded-md">
    <p className="text-white">Score: {score}</p>
  </div>
);

export const HighScore = ({ record }) => (
  <div className="bg-purple-300 px-2 py-1 text-base rounded-md">
    <p className="text-white">High Score: {record}</p>
  </div>
);
