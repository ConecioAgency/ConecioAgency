import React from "react";

export default function EvaModel() {
  return (
    <div className="eva">
      <div className="head">
        <div className="scannerThing" />
        <div className="scannerOrigin" />
        <div className="eyeChamber">
          <div className="eye" />
          <div className="eye" />
        </div>
      </div>
      <div className="body">
        <div className="hand" />
        <div className="hand" />
      </div>
      <style jsx>{`
        .eva {
          --EVA-ROTATION-DURATION: 4s;
          transform-style: preserve-3d;
          animation: rotateRight var(--EVA-ROTATION-DURATION) linear infinite alternate;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          width: 10rem;
          min-width: 8rem;
          height: 16rem;
          position: relative;
        }
        .head {
          position: relative;
          width: 6rem;
          height: 4rem;
          border-radius: 48% 53% 45% 55% / 79% 79% 20% 22%;
          background: linear-gradient(to right, white 45%, #d1d5db);
          z-index: 2;
        }
        .scannerThing, .scannerOrigin {
          z-index: 10;
        }
        .scannerThing {
          width: 0;
          height: 0;
          position: absolute;
          left: 50%;
          top: 0.75rem;
          border-top: 12rem solid rgba(56,189,248,0.18);
          border-left: 8rem solid transparent;
          border-right: 8rem solid transparent;
          transform-origin: top center;
          mask-image: radial-gradient(ellipse at top, white 70%, transparent 100%);
          filter: blur(4px);
          animation: glow 2s cubic-bezier(0.86, 0, 0.07, 1) infinite;
          transform: translateX(-50%);
          z-index: 9;
        }
        .scannerOrigin {
          position: absolute;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          left: 50%;
          top: 0.5rem;
          background: #9bdaeb;
          box-shadow: 0 0 12px 2px #9bdaeb, 0 0 2px #fff, inset 0px 0px 5px rgba(0,0,0,0.5);
          animation: moveRight var(--EVA-ROTATION-DURATION) linear infinite;
          transform: translate(-50%, -50%);
          z-index: 10;
        }
        .eyeChamber {
          width: 4.5rem;
          height: 2.75rem;
          position: absolute;
          left: 50%;
          top: 55%;
          border-radius: 45% 53% 45% 48% / 62% 59% 35% 34%;
          background-color: #0c203c;
          box-shadow: 0px 0px 2px 2px white, inset 0px 0px 0px 2px black;
          transform: translate(-50%, -50%);
          animation: moveRight var(--EVA-ROTATION-DURATION) linear infinite alternate;
        }
        .eye {
          width: 1.2rem;
          height: 1.5rem;
          position: absolute;
          border-radius: 50%;
        }
        .eye:first-child {
          left: 12px;
          top: 50%;
          background: repeating-linear-gradient(65deg, #9bdaeb 0px, #9bdaeb 1px, white 2px);
          box-shadow: inset 0px 0px 5px #04b8d5, 0px 0px 15px 1px #0bdaeb;
          transform: translate(0, -50%) rotate(-65deg);
        }
        .eye:nth-child(2) {
          right: 12px;
          top: 50%;
          background: repeating-linear-gradient(-65deg, #9bdaeb 0px, #9bdaeb 1px, white 2px);
          box-shadow: inset 0px 0px 5px #04b8d5, 0px 0px 15px 1px #0bdaeb;
          transform: translate(0, -50%) rotate(65deg);
        }
        .body {
          width: 6rem;
          height: 8rem;
          position: relative;
          margin-block-start: 0.25rem;
          border-radius: 47% 53% 45% 55% / 12% 9% 90% 88%;
          background: linear-gradient(to right, white 35%, #d1d5db);
          z-index: 2;
        }
        .hand {
          position: absolute;
          left: -1.5rem;
          top: 0.75rem;
          width: 2rem;
          height: 5.5rem;
          border-radius: 40%;
          background: linear-gradient(to left, white 15%, #d1d5db);
          box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.15);
          transform: rotateY(55deg) rotateZ(10deg);
        }
        .hand:first-child {
          animation: compensateRotation var(--EVA-ROTATION-DURATION) linear infinite alternate;
        }
        .hand:nth-child(2) {
          left: 92%;
          background: linear-gradient(to right, white 15%, #d1d5db);
          transform: rotateY(55deg) rotateZ(-10deg);
          animation: compensateRotationRight var(--EVA-ROTATION-DURATION) linear infinite alternate;
        }
        @keyframes rotateRight {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(25deg); }
        }
        @keyframes moveRight {
          from { transform: translate(-50%, -50%); }
          to { transform: translate(-40%, -50%); }
        }
        @keyframes compensateRotation {
          from { transform: rotateY(55deg) rotateZ(10deg); }
          to { transform: rotateY(30deg) rotateZ(10deg); }
        }
        @keyframes compensateRotationRight {
          from { transform: rotateY(55deg) rotateZ(-10deg); }
          to { transform: rotateY(70deg) rotateZ(-10deg); }
        }
        @keyframes glow {
          from { opacity: 0; }
          20% { opacity: 1; }
          45% { transform: rotate(-25deg); }
          75% { transform: rotate(5deg); }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
} 