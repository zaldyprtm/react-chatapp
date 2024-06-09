import { TypeAnimation } from 'react-type-animation';

const Hello = () => {
  return (
    <>
      <div className="mt-20 mx-auto w-80 md:w-full md:mx-auto flex justify-center items-center">
        <TypeAnimation
          className="text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500"
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Silahkan Login Dahulu",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "untuk melanjutkan ke halaman chat",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "2em", display: "inline-block" }}
          repeat={Infinity}
        />
      </div>
    </>
  );
};

export default Hello;
