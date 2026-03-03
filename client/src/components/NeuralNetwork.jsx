import Particles from "react-tsparticles";

export default function NeuralNetwork() {
  return (
    <Particles
      options={{
        particles: {
          number: { value: 40 },
          color: { value: "#6366f1" },
          links: {
            enable: true,
            color: "#6366f1",
            distance: 150,
            opacity: 0.3,
            width: 1,
          },
          move: { enable: true, speed: 1 },
          size: { value: 2 },
        },
      }}
      className="fixed inset-0 z-0"
    />
  );
}