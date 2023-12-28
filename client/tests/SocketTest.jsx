import { useSocket } from "../hooks/useSocket";

export default function SocketTest() {
  const { messages, message, setMessage, sendMessage } = useSocket();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SocketTest</h1>

      <ul className="list-disc pl-4">
        {messages.map((message, i) => (
          <li key={i} className="mb-2">
            {message}
          </li>
        ))}
      </ul>

      <input
        className="border rounded px-3 py-2 mt-4 w-full"
        value={message}
        type="text"
        onChange={setMessage}
        placeholder="Type your message"
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={sendMessage}
      >
        Send Message to Client
      </button>
    </div>
  );
}
