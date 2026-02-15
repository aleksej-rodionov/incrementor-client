import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { io } from "socket.io-client";

const socket = io("https://incrementor.godzilo.com", { transports: ["websocket"] });

export default function Index() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.on("counter", (value: number) => {
      setCount(value);
    });
    return () => {
      socket.off("counter");
    };
  }, []);

  const handleIncrement = () => {
    socket.emit("counter");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 48, fontWeight: "bold" }}>
        {count}
      </Text>
      <Button title="Increment" onPress={handleIncrement} />
    </View>
  );
}
