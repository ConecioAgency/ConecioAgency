import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ChartBarIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  MegaphoneIcon,
  PresentationChartLineIcon,
  SparklesIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';
import WhatToExpect from '../components/WhatToExpect';
import ContactFaqSection from '../components/ContactFaqSection';
import GooeyButton from '../components/GooeyButton';
import { useTranslation } from 'next-i18next';
import React from 'react';

const ServiceMarquee = () => {
  const { t } = useTranslation('common');
const services = [
    { name: t('services.seo_sem.title'), icon: ChartBarIcon },
    { name: t('services.web_design.title'), icon: GlobeAltIcon },
    { name: t('services.marketing_mobile.title'), icon: DevicePhoneMobileIcon },
    { name: t('services.social_media.title'), icon: MegaphoneIcon },
    { name: t('services.content_creator.title'), icon: PresentationChartLineIcon },
    { name: t('services.ux_ui_design.title'), icon: PaintBrushIcon },
    { name: t('services.innovation_digitale.title'), icon: SparklesIcon }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm h-6">
      <div className="flex animate-scroll">
        {[...services, ...services].map((service, index) => (
          <div key={index} className="flex-shrink-0 px-4 flex items-center gap-2">
            <service.icon className="w-5 h-5 text-white/80" />
            <span className="text-xl font-bold text-white/80 hover:text-white transition-colors duration-300">
              {service.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = `
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-scroll {
    animation: scroll 40s linear infinite;
    display: flex;
    width: max-content;
  }

  .animate-scroll:hover {
    animation-play-state: paused;
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Composant CodeEditor pour la carte Web Design
function CodeEditorDemo(): React.ReactElement {
  return (
    <div className="code-editor-demo">
      <div className="header">
        <span className="title">CSS</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="icon"><g strokeWidth="0" /><g strokeLinejoin="round" strokeLinecap="round" /><g> <path strokeLinecap="round" strokeWidth="2" stroke="#4C4F5A" d="M6 6L18 18"></path> <path strokeLinecap="round" strokeWidth="2" stroke="#4C4F5A" d="M18 6L6 18"></path> </g></svg>
      </div>
      <div className="editor-content">
        <code className="code">
          <p><span className="color-0">.code-editor </span> <span>{'{'}</span></p>
          <p className="property">
            <span className="color-2">max-width</span><span>:</span>
            <span className="color-1">300px</span>;
          </p>
          <p className="property">
            <span className="color-2">background-color</span><span>:</span>
            <span className="color-preview-1"></span><span>#1d1e22</span>;
          </p>
          <p className="property">
            <span className="color-2"> box-shadow</span><span>:</span>
            <span className="color-1">0px 4px 30px <span className="color-preview-2"></span><span className="color-3">rgba(</span>0, 0, 0, 0.5<span className="color-3">)</span></span>;
          </p>
          <p className="property">
            <span className="color-2">border-radius</span><span>:</span>
            <span className="color-1">8px</span>;
          </p>
          <span>{'}'}</span>
        </code>
      </div>
      <style jsx>{`
        .code-editor-demo {
          max-width: 300px;
          background-color: #1d1e22;
          box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          padding: 2px;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 10px;
        }
        .title {
          letter-spacing: 1.57px;
          color: rgb(212 212 212);
        }
        .icon {
          width: 20px;
          transition: .2s ease;
        }
        .icon:hover {
          cursor: pointer;
          border-radius: 50px;
          background-color: #6e7281;
        }
        .editor-content {
          margin: 0 10px 10px;
          color: white;
        }
        .property {
          margin-left: 30px;
        }
        .property:hover {
          cursor: text;
        }
        .editor-content .color-0 {
          color: rgb(86 156 214);
        }
        .editor-content .color-1 {
          color: rgb(182 206 168);
        }
        .editor-content .color-2 {
          color: rgb(156 220 254);
        }
        .editor-content .color-3 {
          color: rgb(207 146 120);
        }
        .color-preview-1, .color-preview-2 {
          height: 8px;
          width: 8px;
          border: 1px solid #fff;
          display: inline-block;
          margin-right: 3px;
        }
        .color-preview-1 {
          background-color: #1d1e22;
        }
        .color-preview-2 {
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}

// Composant MobileDemo pour la carte Marketing Mobile
function MobileDemo(): React.ReactElement {
  return (
    <div className="mobile-ui-demo-container">
      <span className="top-border"></span>
      <p className="time">12:00</p>
      <p className="date">Fri, 20 December</p>
      <svg
        className="fingerprint"
        width="26px"
        height="26px"
        viewBox="0 0 0.488 0.488"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.409 0.114a0.196 0.196 0 0 1 0.027 0.122v0.024c0 0.026 0.007 0.051 0.019 0.073M0.146 0.212c0 -0.026 0.01 -0.051 0.028 -0.069a0.096 0.096 0 0 1 0.068 -0.029c0.026 0 0.05 0.01 0.068 0.029s0.028 0.043 0.028 0.069v0.024c0 0.053 0.017 0.104 0.048 0.146m-0.145 -0.17v0.049A0.343 0.343 0 0 0 0.303 0.455M0.146 0.309A0.442 0.442 0 0 0 0.189 0.455m-0.118 -0.049c-0.016 -0.055 -0.024 -0.113 -0.022 -0.17V0.212a0.195 0.195 0 0 1 0.026 -0.098 0.194 0.194 0 0 1 0.071 -0.072 0.192 0.192 0 0 1 0.194 0"
          stroke="#000000"
          strokeLinecap="square"
          strokeLinejoin="round"
          strokeWidth="0.0325"
        ></path>
      </svg>
      <svg
        className="camera"
        width="24"
        height="24"
        viewBox="0 0 0.72 0.72"
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M.57.18H.522L.492.15A.1.1 0 0 0 .42.12H.3a.1.1 0 0 0-.072.03l-.03.03H.15a.09.09 0 0 0-.09.09v.24C.06.56.1.6.15.6h.42C.62.6.66.56.66.51V.27A.09.09 0 0 0 .57.18m-.21.3a.105.105 0 1 1 0-.21.105.105 0 0 1 0 .21M.54.339a.039.039 0 1 1 0-.078.039.039 0 0 1 0 .078"
        ></path>
      </svg>
      <svg
        className="phone"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        xmlSpace="preserve"
        width="24"
        height="24"
      >
        <path
          fill="none"
          stroke="#000"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          d="m10.2 6.375-3.075-3.15c-.375-.3-.9-.3-1.275 0l-2.325 2.4c-.525.45-.675 1.2-.45 1.8.6 1.725 2.175 5.175 5.25 8.25s6.525 4.575 8.25 5.25c.675.225 1.35.075 1.875-.375l2.325-2.325c.375-.375.375-.9 0-1.275L17.7 13.875c-.375-.375-.9-.375-1.275 0L14.55 15.75s-2.1-.9-3.75-2.475-2.475-3.75-2.475-3.75L10.2 7.65c.375-.375.375-.975 0-1.275z"
        ></path>
      </svg>
      <span className="right-border top"></span>
      <style jsx>{`
        .mobile-ui-demo-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 300px;
          width: 160px;
          border: 4px solid black;
          border-radius: 1rem;
          background-color: #f9fafb;
          box-shadow: 5px 5px 2.5px 6px rgb(209, 218, 218);
        }
        .time {
          font-size: 2.5rem;
          margin: 1.5rem 0 -12px;
        }
        .date {
          font-size: 12px;
        }
        .fingerprint {
          position: absolute;
          bottom: 3rem;
        }
        .phone {
          position: absolute;
          bottom: 10px;
          left: 10px;
          padding: 4px;
          background-color: rgb(209, 218, 218);
          border-radius: 6px;
        }
        .camera {
          position: absolute;
          bottom: 10px;
          right: 10px;
          padding: 4px;
          background-color: rgb(209, 218, 218);
          border-radius: 6px;
        }
        .top-border {
          border: 1px solid black;
          background-color: black;
          width: 80px;
          height: 8px;
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
        }
        .right-border {
          position: absolute;
          border: 4px solid black;
          right: -8px;
          border-radius: 0.375rem;
        }
        .right-border.top {
          top: 56px;
          height: 28px;
        }
      `}</style>
    </div>
  );
}

// Composant TypewriterDemo pour la carte Content Creator
function TypewriterDemo(): React.ReactElement {
  return (
    <div className="typewriter">
      <div className="slide"><i></i></div>
      <div className="paper"></div>
      <div className="keyboard"></div>
      <style jsx>{`
        .typewriter {
          --blue: #5cbbff;
          --blue-dark: #162d72;
          --key: #fff;
          --paper: #eef0fd;
          --text: #00000049;
          --tool: #ffbb00;
          --duration: 3s;
          position: relative;
          -webkit-animation: bounce05 var(--duration) linear infinite;
          animation: bounce05 var(--duration) linear infinite;
        }
        .typewriter .slide {
          width: 92px;
          height: 20px;
          border-radius: 3px;
          margin-left: 14px;
          transform: translateX(14px);
          background: linear-gradient(var(--blue), var(--blue-dark));
          -webkit-animation: slide05 var(--duration) ease infinite;
          animation: slide05 var(--duration) ease infinite;
        }
        .typewriter .slide:before,
        .typewriter .slide:after,
        .typewriter .slide i:before {
          content: "";
          position: absolute;
          background: var(--tool);
        }
        .typewriter .slide:before {
          width: 2px;
          height: 8px;
          top: 6px;
          left: 100%;
        }
        .typewriter .slide:after {
          left: 94px;
          top: 3px;
          height: 14px;
          width: 6px;
          border-radius: 3px;
        }
        .typewriter .slide i {
          display: block;
          position: absolute;
          right: 100%;
          width: 6px;
          height: 4px;
          top: 4px;
          background: var(--tool);
        }
        .typewriter .slide i:before {
          right: 100%;
          top: -2px;
          width: 4px;
          border-radius: 2px;
          height: 14px;
        }
        .typewriter .paper {
          position: absolute;
          left: 24px;
          top: -26px;
          width: 40px;
          height: 46px;
          border-radius: 5px;
          background: var(--paper);
          transform: translateY(46px);
          -webkit-animation: paper05 var(--duration) linear infinite;
          animation: paper05 var(--duration) linear infinite;
        }
        .typewriter .paper:before {
          content: "";
          position: absolute;
          left: 6px;
          right: 6px;
          top: 7px;
          border-radius: 2px;
          height: 4px;
          transform: scaleY(0.8);
          background: var(--text);
          box-shadow: 0 12px 0 var(--text), 0 24px 0 var(--text), 0 36px 0 var(--text);
        }
        .typewriter .keyboard {
          width: 120px;
          height: 56px;
          margin-top: -10px;
          z-index: 1;
          position: relative;
        }
        .typewriter .keyboard:before,
        .typewriter .keyboard:after {
          content: "";
          position: absolute;
        }
        .typewriter .keyboard:before {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 7px;
          background: linear-gradient(135deg, var(--blue), var(--blue-dark));
          transform: perspective(10px) rotateX(2deg);
          transform-origin: 50% 100%;
        }
        .typewriter .keyboard:after {
          left: 2px;
          top: 25px;
          width: 11px;
          height: 4px;
          border-radius: 2px;
          box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
            60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
            22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
            60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
          -webkit-animation: keyboard05 var(--duration) linear infinite;
          animation: keyboard05 var(--duration) linear infinite;
        }
        @keyframes bounce05 {
          85%,
          92%,
          100% {
            transform: translateY(0);
          }
          89% {
            transform: translateY(-4px);
          }
          95% {
            transform: translateY(2px);
          }
        }
        @keyframes slide05 {
          5% {
            transform: translateX(14px);
          }
          15%,
          30% {
            transform: translateX(6px);
          }
          40%,
          55% {
            transform: translateX(0);
          }
          65%,
          70% {
            transform: translateX(-4px);
          }
          80%,
          89% {
            transform: translateX(-12px);
          }
          100% {
            transform: translateX(14px);
          }
        }
        @keyframes paper05 {
          5% {
            transform: translateY(46px);
          }
          20%,
          30% {
            transform: translateY(34px);
          }
          40%,
          55% {
            transform: translateY(22px);
          }
          65%,
          70% {
            transform: translateY(10px);
          }
          80%,
          85% {
            transform: translateY(0);
          }
          92%,
          100% {
            transform: translateY(46px);
          }
        }
        @keyframes keyboard05 {
          5%,
          12%,
          21%,
          30%,
          39%,
          48%,
          57%,
          66%,
          75%,
          84% {
            box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
              60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
              22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
              60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
          }
          9% {
            box-shadow: 15px 2px 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
              60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
              22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
              60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
          }
          18% {
            box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
              60px 2px 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
              22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
              60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
          }
          27% {
            box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
              60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
              22px 12px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
              60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
          }
          36% {
            box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
              60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
              22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 12px 0 var(--key),
              60px 12px 0 var(--key), 68px 12px 0 var(--key), 83px 10px 0 var(--key);
          }
          45% {
            box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
              60px 0 0 var(--key), 75px 0 0 var(--key), 90px 2px 0 var(--key),
              22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
              60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
          }
          54% {
            box-shadow: 15px 0 0 var(--key), 30px 2px 0 var(--key), 45px 0 0 var(--key),
              60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
              22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
              60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
          }
          63% {
            box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
              60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
              22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
              60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 12px 0 var(--key);
          }
          72% {
            box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 2px 0 var(--key),
              60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
              22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key),
              60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
          }
          81% {
            box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key),
              60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key),
              22px 10px 0 var(--key), 37px 12px 0 var(--key), 52px 10px 0 var(--key),
              60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
          }
        }
      `}</style>
    </div>
  );
}

// Composant MacbookDemo pour la carte UX/UI Design
function MacbookDemo(): React.ReactElement {
  return (
    <div className="container">
      <div className="macbook">
        <div className="macbook__topBord">
          <div className="macbook__display">
            <div className="macbook__load"></div>
          </div>
        </div>
        <div className="macbook__underBord">
          <div className="macbook__keybord">
            <div className="keybord">
              <div className="keybord__touchbar"></div>
              <ul className="keybord__keyBox">
                <li className="keybord__key key--01"></li>
                <li className="keybord__key key--02"></li>
                <li className="keybord__key key--03"></li>
                <li className="keybord__key key--04"></li>
                <li className="keybord__key key--05"></li>
                <li className="keybord__key key--06"></li>
                <li className="keybord__key key--07"></li>
                <li className="keybord__key key--08"></li>
                <li className="keybord__key key--09"></li>
                <li className="keybord__key key--10"></li>
                <li className="keybord__key key--11"></li>
                <li className="keybord__key key--12"></li>
                <li className="keybord__key key--13"></li>
              </ul>
              <ul className="keybord__keyBox--under">
                <li className="keybord__key key--14"></li>
                <li className="keybord__key key--15"></li>
                <li className="keybord__key key--16"></li>
                <li className="keybord__key key--17"></li>
                <li className="keybord__key key--18"></li>
                <li className="keybord__key key--19"></li>
                <li className="keybord__key key--20"></li>
                <li className="keybord__key key--21"></li>
                <li className="keybord__key key--22"></li>
                <li className="keybord__key key--23"></li>
                <li className="keybord__key key--24"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .macbook {
          position: relative;
          width: 228px;
          height: 260px;
        }
        .macbook__topBord {
          position: absolute;
          z-index: 0;
          top: 34px;
          left: 0;
          width: 128px;
          height: 116px;
          border-radius: 6px;
          transform-origin: center;
          background: linear-gradient(-135deg, #c8c9c9 52%, #8c8c8c 56%);
          transform: scale(0) skewY(-30deg);
          animation: topbord 0.4s 1.7s ease-out;
          animation-fill-mode: forwards;
        }
        .macbook__topBord::before {
          content: "";
          position: absolute;
          z-index: 2;
          top: 8px;
          left: 6px;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          background: #000;
        }
        .macbook__topBord::after {
          content: "";
          position: absolute;
          z-index: 1;
          bottom: -7px;
          left: 8px;
          width: 168px;
          height: 12px;
          transform-origin: left bottom;
          transform: rotate(-42deg) skew(-4deg);
          background: linear-gradient(-135deg, #c8c9c9 52%, #8c8c8c 56%);
        }
        .macbook__display {
          position: absolute;
          z-index: 10;
          top: 17px;
          left: 12px;
          z-index: 2;
          width: calc(100% - 12px);
          height: calc(100% - 18px);
          background: linear-gradient(45deg, #3ba9ff, #c82aff);
        }
        .macbook__display::before {
          content: "";
          position: absolute;
          z-index: 5;
          top: -9px;
          left: -6px;
          width: calc(100% + 12px);
          height: calc(100% + 18px);
          border-radius: 6px;
          background: linear-gradient(
            60deg,
            rgba(255, 255, 255, 0) 60%,
            rgba(255, 255, 255, 0.3) 60%
          );
        }
        .macbook__load {
          position: relative;
          width: 100%;
          height: 100%;
          background: #222;
          animation: display 0.4s 4.3s ease;
          opacity: 1;
          animation-fill-mode: forwards;
        }
        .macbook__load:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 80px;
          height: 6px;
          border-radius: 3px;
          box-sizing: border-box;
          border: solid 1px #fff;
        }
        .macbook__load:after {
          content: "";
          position: absolute;
          top: 0;
          left: 18px;
          bottom: 0;
          margin: auto;
          width: 0;
          height: 6px;
          border-radius: 3px;
          background: #fff;
          animation: load 2s 2s ease-out;
          animation-fill-mode: forwards;
        }
        .macbook__underBord {
          position: relative;
          left: 42px;
          bottom: -145px;
          width: 150px;
          height: 90px;
          border-radius: 6px;
          transform-origin: center;
          transform: rotate(-30deg) skew(30deg);
          background: linear-gradient(-45deg, #c8c9c9 61%, #8c8c8c 66%);
          animation: modal 0.5s 1s ease-out;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .macbook__underBord::before {
          content: "";
          position: absolute;
          z-index: 3;
          top: -8px;
          left: 8px;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          background: #dcdede;
        }
        .macbook__underBord::after {
          content: "";
          position: absolute;
          z-index: 2;
          top: -8px;
          left: 12px;
          width: 170px;
          height: 15px;
          transform-origin: top left;
          background: linear-gradient(-45deg, #c8c9c9 61%, #8c8c8c 66%);
          transform: rotate(31deg) skew(-16deg);
        }
        .macbook__keybord {
          position: relative;
          top: 0;
          left: 16px;
          z-index: 3;
          border-radius: 3px;
          width: calc(100% - 16px);
          height: 45px;
          background: #c8c9c9;
        }
        .macbook__keybord::before {
          content: "";
          position: absolute;
          bottom: -30px;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: 40px;
          height: 25px;
          border-radius: 3px;
          background: #c8c9c9;
        }
        .keybord {
          position: relative;
          top: 2px;
          left: 2px;
          display: flex;
          flex-direction: column;
          width: calc(100% - 3px);
          height: calc(100% - 4px);
        }
        .keybord__touchbar {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #000;
        }
        .keybord__keyBox {
          display: grid;
          grid-template-rows: 3fr 1fr;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          width: 100%;
          height: 24px;
          margin: 1px 0 0 0;
          padding: 0 0 0 1px;
          box-sizing: border-box;
          list-style: none;
        }
        .keybord__key {
          position: relative;
          width: 8px;
          height: 7px;
          margin: 1px;
          background: #000;
        }
        .keybord__keyBox .keybord__key {
          transform: translate(60px, -60px);
          animation: key 0.2s 1.4s ease-out;
          animation-fill-mode: forwards;
          opacity: 0;
        }
        .keybord__keyBox .keybord__key::before,
        .keybord__keyBox .keybord__key::after {
          content: "";
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
        }
        .keybord__key::before {
          top: 8px;
          transform: translate(20px, -20px);
          animation: key1 0.2s 1.5s ease-out;
          animation-fill-mode: forwards;
        }
        .keybord__key::after {
          top: 16px;
          transform: translate(40px, -40px);
          animation: key2 0.2s 1.6s ease-out;
          animation-fill-mode: forwards;
        }
        .keybord__keyBox .key--12::before {
          width: 10px;
        }
        .keybord__keyBox .key--13::before {
          height: 10px;
        }
        .key--01 {
          grid-row: 1 / 2;
          grid-column: 1 / 2;
        }
        .key--02 {
          grid-row: 1 / 2;
          grid-column: 2 / 3;
        }
        .key--03 {
          grid-row: 1 / 2;
          grid-column: 3 / 4;
        }
        .key--04 {
          grid-row: 1 / 2;
          grid-column: 4 / 5;
        }
        .key--05 {
          grid-row: 1 / 2;
          grid-column: 5 / 6;
        }
        .key--06 {
          grid-row: 1 / 2;
          grid-column: 6 / 7;
        }
        .key--07 {
          grid-row: 1 / 2;
          grid-column: 7 / 8;
        }
        .key--08 {
          grid-row: 1 / 2;
          grid-column: 8 / 9;
        }
        .key--09 {
          grid-row: 1 / 2;
          grid-column: 9 / 10;
        }
        .key--10 {
          grid-row: 1 / 2;
          grid-column: 10 / 11;
        }
        .key--11 {
          grid-row: 1 / 2;
          grid-column: 11 / 12;
        }
        .key--12 {
          grid-row: 1 / 2;
          grid-column: 12 / 13;
        }
        .key--13 {
          grid-row: 1 / 2;
          grid-column: 13 / 14;
        }
        .keybord__keyBox--under {
          margin: 0;
          padding: 0 0 0 1px;
          box-sizing: border-box;
          list-style: none;
          display: flex;
        }
        .keybord__keyBox--under .keybord__key {
          transform: translate(80px, -80px);
          animation: key3 0.3s 1.6s linear;
          animation-fill-mode: forwards;
          opacity: 0;
        }
        .key--19 {
          width: 28px;
        }
        @keyframes topbord {
          0% {
            transform: scale(0) skewY(-30deg);
          }
          30% {
            transform: scale(1.1) skewY(-30deg);
          }
          45% {
            transform: scale(0.9) skewY(-30deg);
          }
          60% {
            transform: scale(1.05) skewY(-30deg);
          }
          75% {
            transform: scale(0.95) skewY(-30deg);
          }
          90% {
            transform: scale(1.02) skewY(-30deg);
          }
          100% {
            transform: scale(1) skewY(-30deg);
          }
        }
        @keyframes display {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes load {
          0% {
            width: 0;
          }
          20% {
            width: 40px;
          }
          30% {
            width: 40px;
          }
          60% {
            width: 60px;
          }
          90% {
            width: 60px;
          }
          100% {
            width: 80px;
          }
        }
        @keyframes modal {
          0% {
            transform: scale(0) rotate(-30deg) skew(30deg);
            opacity: 0;
          }
          30% {
            transform: scale(1.1) rotate(-30deg) skew(30deg);
            opacity: 1;
          }
          45% {
            transform: scale(0.9) rotate(-30deg) skew(30deg);
            opacity: 1;
          }
          60% {
            transform: scale(1.05) rotate(-30deg) skew(30deg);
            opacity: 1;
          }
          75% {
            transform: scale(0.95) rotate(-30deg) skew(30deg);
            opacity: 1;
          }
          90% {
            transform: scale(1.02) rotate(-30deg) skew(30deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(-30deg) skew(30deg);
            opacity: 1;
          }
        }
        @keyframes key {
          0% {
            transform: translate(60px, -60px);
            opacity: 0;
          }
          100% {
            transform: translate(0px, 0px);
            opacity: 1;
          }
        }
        @keyframes key1 {
          0% {
            transform: translate(20px, -20px);
            opacity: 0;
          }
          100% {
            transform: translate(0px, 0px);
            opacity: 1;
          }
        }
        @keyframes key2 {
          0% {
            transform: translate(40px, -40px);
            opacity: 0;
          }
          100% {
            transform: translate(0px, 0px);
            opacity: 1;
          }
        }
        @keyframes key3 {
          0% {
            transform: translate(80px, -80px);
            opacity: 0;
          }
          100% {
            transform: translate(0px, 0px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// Composant SocialMediaDemo pour la carte Social Media
function SocialMediaDemo(): React.ReactElement {
  return (
    <div className="main">
      <div className="up">
        <button className="card1">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="30px" height="30px" fillRule="nonzero" className="instagram"><g fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><g transform="scale(8,8)"><path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z"></path></g></g></svg>
        </button>
        <button className="card2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px" className="twitter"><path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path></svg>
        </button>
      </div>
      <div className="down">
        <button className="card3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" className="github">    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0-2.316,0.261-3.447C9.867,11.649,15.062,15,21.065,15c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path></svg>
        </button>
        <button className="card4">
          <svg height="30px" width="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="discord"><path d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"></path></svg>
        </button>
      </div>
      <style jsx>{`
        .main {
          display: flex;
          flex-direction: column;
          gap: 0.5em;
        }
        .up {
          display: flex;
          flex-direction: row;
          gap: 0.5em;
        }
        .down {
          display: flex;
          flex-direction: row;
          gap: 0.5em;
        }
        .card1 {
          width: 90px;
          height: 90px;
          outline: none;
          border: none;
          background: white;
          border-radius: 90px 5px 5px 5px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          transition: .2s ease-in-out;
        }
        .instagram {
          margin-top: 1.5em;
          margin-left: 1.2em;
          fill: #cc39a4;
        }
        .card2 {
          width: 90px;
          height: 90px;
          outline: none;
          border: none;
          background: white;
          border-radius: 5px 90px 5px 5px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          transition: .2s ease-in-out;
        }
        .twitter {
          margin-top: 1.5em;
          margin-left: -.9em;
          fill: #03A9F4;
        }
        .card3 {
          width: 90px;
          height: 90px;
          outline: none;
          border: none;
          background: white;
          border-radius: 5px 5px 5px 90px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          transition: .2s ease-in-out;
        }
        .github {
          margin-top: -.6em;
          margin-left: 1.2em;
        }
        .card4 {
          width: 90px;
          height: 90px;
          outline: none;
          border: none;
          background: white;
          border-radius: 5px 5px 90px 5px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          transition: .2s ease-in-out;
        }
        .discord {
          margin-top: -.9em;
          margin-left: -1.2em;
          fill: #8c9eff;
        }
        .card1:hover {
          cursor: pointer;
          scale: 1.1;
          background-color: #cc39a4;
        }
        .card1:hover .instagram {
          fill: white;
        }
        .card2:hover {
          cursor: pointer;
          scale: 1.1;
          background-color: #03A9F4;
        }
        .card2:hover .twitter {
          fill: white;
        }
        .card3:hover {
          cursor: pointer;
          scale: 1.1;
          background-color: black;
        }
        .card3:hover .github {
          fill: white;
        }
        .card4:hover {
          cursor: pointer;
          scale: 1.1;
          background-color: #8c9eff;
        }
        .card4:hover .discord {
          fill: white;
        }
      `}</style>
    </div>
  );
}

// Composant InnovationDemo pour la carte Innovation Digitale
function InnovationDemo(): React.ReactElement {
  return (
    <div className="pyramid-loader">
      <div className="wrapper">
        <span className="side side1"></span>
        <span className="side side2"></span>
        <span className="side side3"></span>
        <span className="side side4"></span>
        <span className="shadow"></span>
      </div>
      <style jsx>{`
        .pyramid-loader {
          position: relative;
          width: 300px;
          height: 300px;
          display: block;
          transform-style: preserve-3d;
          transform: rotateX(-20deg);
        }
        .wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          100% {
            transform: rotateY(360deg);
          }
        }
        .pyramid-loader .wrapper .side {
          width: 70px;
          height: 70px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          transform-origin: center top;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .pyramid-loader .wrapper .side1 {
          transform: rotateZ(-30deg) rotateY(90deg);
          background: conic-gradient( #2BDEAC, #F028FD, #D8CCE6, #2F2585);
        }
        .pyramid-loader .wrapper .side2 {
          transform: rotateZ(30deg) rotateY(90deg);
          background: conic-gradient( #2F2585, #D8CCE6, #F028FD, #2BDEAC);
        }
        .pyramid-loader .wrapper .side3 {
          transform: rotateX(30deg);
          background: conic-gradient( #2F2585, #D8CCE6, #F028FD, #2BDEAC);
        }
        .pyramid-loader .wrapper .side4 {
          transform: rotateX(-30deg);
          background: conic-gradient( #2BDEAC, #F028FD, #D8CCE6, #2F2585);
        }
        .pyramid-loader .wrapper .shadow {
          width: 60px;
          height: 60px;
          background: #8B5AD5;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          transform: rotateX(90deg) translateZ(-40px);
          filter: blur(12px);
        }
      `}</style>
    </div>
  );
}

// Composant HexagonLoader pour l'animation en haut de la page
function HexagonLoader(): React.ReactElement {
  return (
    <div className="hexagon-loader">
      <div className="socket">
        <div className="gel center-gel">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c1 r1">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c2 r1">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c3 r1">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c4 r1">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c5 r1">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c6 r1">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c7 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c8 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c9 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c10 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c11 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c12 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c13 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c14 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c15 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c16 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c17 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c18 r2">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c19 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c20 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c21 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c22 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c23 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c24 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c25 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c26 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c28 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c29 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c30 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c31 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c32 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c33 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c34 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c35 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c36 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
        <div className="gel c37 r3">
          <div className="hex-brick h1"></div>
          <div className="hex-brick h2"></div>
          <div className="hex-brick h3"></div>
        </div>
      </div>
      <style jsx>{`
        .hexagon-loader {
          position: absolute;
          top: 0;
          left: -10%;
          width: 120%;
          height: 100%;
          overflow: hidden;
          opacity: 0.15;
          pointer-events: none;
          transform: scale(1.2);
        }
        .socket {
          width: 200px;
          height: 200px;
          position: absolute;
          left: 50%;
          margin-left: -100px;
          top: 50%;
          margin-top: -100px;
        }
        .hex-brick {
          background: violet;
          width: 30px;
          height: 17px;
          position: absolute;
          top: 5px;
          animation-name: fade00;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          -webkit-animation-name: fade00;
          -webkit-animation-duration: 2s;
          -webkit-animation-iteration-count: infinite;
        }
        .h2 {
          transform: rotate(60deg);
          -webkit-transform: rotate(60deg);
        }
        .h3 {
          transform: rotate(-60deg);
          -webkit-transform: rotate(-60deg);
        }
        .gel {
          height: 30px;
          width: 30px;
          transition: all .3s;
          -webkit-transition: all .3s;
          position: absolute;
          top: 50%;
          left: 50%;
        }
        .center-gel {
          margin-left: -15px;
          margin-top: -15px;
          animation-name: pulse00;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          -webkit-animation-name: pulse00;
          -webkit-animation-duration: 2s;
          -webkit-animation-iteration-count: infinite;
        }
        .c1 { margin-left: -47px; margin-top: -15px; }
        .c2 { margin-left: -31px; margin-top: -43px; }
        .c3 { margin-left: 1px; margin-top: -43px; }
        .c4 { margin-left: 17px; margin-top: -15px; }
        .c5 { margin-left: -31px; margin-top: 13px; }
        .c6 { margin-left: 1px; margin-top: 13px; }
        .c7 { margin-left: -63px; margin-top: -43px; }
        .c8 { margin-left: 33px; margin-top: -43px; }
        .c9 { margin-left: -15px; margin-top: 41px; }
        .c10 { margin-left: -63px; margin-top: 13px; }
        .c11 { margin-left: 33px; margin-top: 13px; }
        .c12 { margin-left: -15px; margin-top: -71px; }
        .c13 { margin-left: -47px; margin-top: -71px; }
        .c14 { margin-left: 17px; margin-top: -71px; }
        .c15 { margin-left: -47px; margin-top: 41px; }
        .c16 { margin-left: 17px; margin-top: 41px; }
        .c17 { margin-left: -79px; margin-top: -15px; }
        .c18 { margin-left: 49px; margin-top: -15px; }
        .c19 { margin-left: -63px; margin-top: -99px; }
        .c20 { margin-left: 33px; margin-top: -99px; }
        .c21 { margin-left: 1px; margin-top: -99px; }
        .c22 { margin-left: -31px; margin-top: -99px; }
        .c23 { margin-left: -63px; margin-top: 69px; }
        .c24 { margin-left: 33px; margin-top: 69px; }
        .c25 { margin-left: 1px; margin-top: 69px; }
        .c26 { margin-left: -31px; margin-top: 69px; }
        .c27 { margin-left: -79px; margin-top: -15px; }
        .c28 { margin-left: -95px; margin-top: -43px; }
        .c29 { margin-left: -95px; margin-top: 13px; }
        .c30 { margin-left: 49px; margin-top: 41px; }
        .c31 { margin-left: -79px; margin-top: -71px; }
        .c32 { margin-left: -111px; margin-top: -15px; }
        .c33 { margin-left: 65px; margin-top: -43px; }
        .c34 { margin-left: 65px; margin-top: 13px; }
        .c35 { margin-left: -79px; margin-top: 41px; }
        .c36 { margin-left: 49px; margin-top: -71px; }
        .c37 { margin-left: 81px; margin-top: -15px; }
        .r1 {
          animation-name: pulse00;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-delay: .2s;
          -webkit-animation-name: pulse00;
          -webkit-animation-duration: 2s;
          -webkit-animation-iteration-count: infinite;
          -webkit-animation-delay: .2s;
        }
        .r2 {
          animation-name: pulse00;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-delay: .4s;
          -webkit-animation-name: pulse00;
          -webkit-animation-duration: 2s;
          -webkit-animation-iteration-count: infinite;
          -webkit-animation-delay: .4s;
        }
        .r3 {
          animation-name: pulse00;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-delay: .6s;
          -webkit-animation-name: pulse00;
          -webkit-animation-duration: 2s;
          -webkit-animation-iteration-count: infinite;
          -webkit-animation-delay: .6s;
        }
        .r1 > .hex-brick {
          animation-name: fade00;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-delay: .2s;
          -webkit-animation-name: fade00;
          -webkit-animation-duration: 2s;
          -webkit-animation-iteration-count: infinite;
          -webkit-animation-delay: .2s;
        }
        .r2 > .hex-brick {
          animation-name: fade00;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-delay: .4s;
          -webkit-animation-name: fade00;
          -webkit-animation-duration: 2s;
          -webkit-animation-iteration-count: infinite;
          -webkit-animation-delay: .4s;
        }
        .r3 > .hex-brick {
          animation-name: fade00;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-delay: .6s;
          -webkit-animation-name: fade00;
          -webkit-animation-duration: 2s;
          -webkit-animation-iteration-count: infinite;
          -webkit-animation-delay: .6s;
        }
        @keyframes pulse00 {
          0% {
            -webkit-transform: scale(1);
            transform: scale(1);
          }
          50% {
            -webkit-transform: scale(0.01);
            transform: scale(0.01);
          }
          100% {
            -webkit-transform: scale(1);
            transform: scale(1);
          }
        }
        @keyframes fade00 {
          0% {
            background: rgb(228, 0, 228);
          }
          50% {
            background: red;
          }
          100% {
            background: violet;
          }
        }
      `}</style>
    </div>
  );
}

export default function ServicesPage() {
  const { t } = useTranslation('common');
  type ServiceType = {
    icon: any;
    title: string;
    description: string;
    image: string;
    color: string;
    iconColor: string;
    features: string[];
    detailedDescription: string;
    sectionTitle: string;
    sectionDescription: string;
  };
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const router = useRouter();

  const services = [
    {
      icon: ChartBarIcon,
      title: t('services.seo_sem.title'),
      description: t('services.seo_sem.description'),
      image: '/images/seo-sem.jpg',
      color: 'from-indigo-500 via-purple-500 to-pink-500',
      iconColor: 'text-indigo-500',
      features: [
        t('services.seo_sem.features.0'),
        t('services.seo_sem.features.1'),
        t('services.seo_sem.features.2'),
        t('services.seo_sem.features.3')
      ],
      detailedDescription: t('services.seo_sem.detailedDescription'),
      sectionTitle: t('services.seo_sem.sectionTitle'),
      sectionDescription: t('services.seo_sem.sectionDescription')
    },
    {
      icon: GlobeAltIcon,
      title: t('services.web_design.title'),
      description: t('services.web_design.description'),
      image: '/images/web-design.jpg',
      color: 'from-green-400 via-teal-400 to-blue-500',
      iconColor: 'text-teal-500',
      features: [
        t('services.web_design.features.0'),
        t('services.web_design.features.1'),
        t('services.web_design.features.2'),
        t('services.web_design.features.3')
      ],
      detailedDescription: t('services.web_design.detailedDescription'),
      sectionTitle: t('services.web_design.sectionTitle'),
      sectionDescription: t('services.web_design.sectionDescription')
    },
    {
      icon: DevicePhoneMobileIcon,
      title: t('services.marketing_mobile.title'),
      description: t('services.marketing_mobile.description'),
      image: '/images/mobile-marketing.jpg',
      color: 'from-pink-500 via-red-400 to-yellow-400',
      iconColor: 'text-pink-500',
      features: [
        t('services.marketing_mobile.features.0'),
        t('services.marketing_mobile.features.1'),
        t('services.marketing_mobile.features.2'),
        t('services.marketing_mobile.features.3')
      ],
      detailedDescription: t('services.marketing_mobile.detailedDescription'),
      sectionTitle: t('services.marketing_mobile.sectionTitle'),
      sectionDescription: t('services.marketing_mobile.sectionDescription')
    },
    {
      icon: MegaphoneIcon,
      title: t('services.social_media.title'),
      description: t('services.social_media.description'),
      image: '/images/social-media.jpg',
      color: 'from-blue-500 via-cyan-400 to-green-400',
      iconColor: 'text-cyan-500',
      features: [
        t('services.social_media.features.0'),
        t('services.social_media.features.1'),
        t('services.social_media.features.2'),
        t('services.social_media.features.3')
      ],
      detailedDescription: t('services.social_media.detailedDescription'),
      sectionTitle: t('services.social_media.sectionTitle'),
      sectionDescription: t('services.social_media.sectionDescription')
    },
    {
      icon: PresentationChartLineIcon,
      title: t('services.content_creator.title'),
      description: t('services.content_creator.description'),
      image: '/images/content-creator.jpg',
      color: 'from-yellow-400 via-orange-400 to-red-500',
      iconColor: 'text-yellow-500',
      features: [
        t('services.content_creator.features.0'),
        t('services.content_creator.features.1'),
        t('services.content_creator.features.2'),
        t('services.content_creator.features.3')
      ],
      detailedDescription: t('services.content_creator.detailedDescription'),
      sectionTitle: t('services.content_creator.sectionTitle'),
      sectionDescription: t('services.content_creator.sectionDescription')
    },
    {
      icon: PaintBrushIcon,
      title: t('services.ux_ui_design.title'),
      description: t('services.ux_ui_design.description'),
      image: '/images/ux-ui-design.jpg',
      color: 'from-purple-500 via-pink-400 to-red-500',
      iconColor: 'text-purple-500',
      features: [
        t('services.ux_ui_design.features.0'),
        t('services.ux_ui_design.features.1'),
        t('services.ux_ui_design.features.2'),
        t('services.ux_ui_design.features.3')
      ],
      detailedDescription: t('services.ux_ui_design.detailedDescription'),
      sectionTitle: t('services.ux_ui_design.sectionTitle'),
      sectionDescription: t('services.ux_ui_design.sectionDescription')
    },
    {
      icon: SparklesIcon,
      title: t('services.innovation_digitale.title'),
      description: t('services.innovation_digitale.description'),
      image: '/images/innovation.jpg',
      color: 'from-purple-500 via-pink-400 to-red-500',
      iconColor: 'text-purple-500',
      features: [
        t('services.innovation_digitale.features.0'),
        t('services.innovation_digitale.features.1'),
        t('services.innovation_digitale.features.2'),
        t('services.innovation_digitale.features.3')
      ],
      detailedDescription: t('services.innovation_digitale.detailedDescription'),
      sectionTitle: t('services.innovation_digitale.sectionTitle'),
      sectionDescription: t('services.innovation_digitale.sectionDescription')
    }
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      // Sélectionne le service correspondant
      const service = services.find(s =>
        s.title.toLowerCase().replace(/\s|&/g, '-').replace(/[^a-z0-9\-]/g, '') === id
      );
      if (service) {
        setSelectedService(service);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 200);
      }
    }
  }, [router.asPath]);

  // CSS du marquee social media
  const marqueeSocialStyle = `
    .marquee-social-container {
      width: 340px;
      background: #232323;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 16px #0002;
      padding: 8px 0;
      position: relative;
    }
    .marquee {
      width: 100%;
      overflow: hidden;
      position: relative;
      height: 48px;
      margin-bottom: 4px;
    }
    .marquee2 {
      margin-bottom: 0;
    }
    .marquee-content {
      display: flex;
      gap: 12px;
      align-items: center;
      height: 48px;
      animation: scroll 12s linear infinite;
    }
    .marquee2 .marquee-content {
      animation-direction: reverse;
      animation-duration: 16s;
    }
    .marquee-content li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 10px;
      background: #fff1;
      box-shadow: 0 1px 4px #0001;
    }
    .marquee-content img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }
    .marquee-social-container:before,
    .marquee-social-container:after {
      content: '';
      position: absolute;
      top: 0;
      width: 32px;
      height: 100%;
      z-index: 2;
      pointer-events: none;
    }
    .marquee-social-container:before {
      left: 0;
      background: linear-gradient(90deg, #232323 60%, transparent);
    }
    .marquee-social-container:after {
      right: 0;
      background: linear-gradient(-90deg, #232323 60%, transparent);
    }
    @keyframes scroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  `;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <Head>
        <title>Services | Conecio</title>
        <meta name="description" content="Découvrez nos services de marketing digital, web design, SEO, et plus encore." />
      </Head>
      <style jsx>{`
        ${marqueeSocialStyle}
        
        @keyframes tracking-in-contract-bck {
          0% {
            letter-spacing: 1em;
            transform: translateZ(400px);
            opacity: 0;
          }
          40% {
            opacity: 0.6;
          }
          100% {
            transform: translateZ(0);
            opacity: 1;
          }
        }

        .tracking-in-contract-bck {
          animation: tracking-in-contract-bck 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
        }

        .hero-subtitle {
          position: relative;
          animation: fadeIn 1.5s ease-out;
        }

        .hero-subtitle::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #4F46E5, transparent);
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .gradient-text {
          background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: var(--size);
          height: var(--size);
          background: white;
          border-radius: 50%;
          opacity: 0.6;
          animation: float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
          left: var(--x);
          top: var(--y);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
          display: flex;
          width: max-content;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        .particle-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.2);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-shine {
          animation: shine 8s linear infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shine-vertical {
          animation: shine-vertical 8s linear infinite;
        }

        @keyframes shine-vertical {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }

        .animate-grain {
          animation: grain 0.5s steps(6) infinite;
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-5%, -5%) }
          20% { transform: translate(-10%, 5%) }
          30% { transform: translate(5%, -10%) }
          40% { transform: translate(-5%, 15%) }
          50% { transform: translate(-10%, 5%) }
          60% { transform: translate(15%, 0) }
          70% { transform: translate(0, 10%) }
          80% { transform: translate(3%, 15%) }
          90% { transform: translate(-10%, 10%) }
        }

        @keyframes tracking-in-expand {
          0% {
            letter-spacing: -0.5em;
            opacity: 0;
          }
          40% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }

        .tracking-in-expand {
          animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }

        @keyframes wave {
          0%, 100% {
            transform: translateY(0) scaleY(1);
          }
          50% {
            transform: translateY(-5px) scaleY(1.1);
          }
        }

        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }

        @keyframes wave-slow {
          0%, 100% {
            transform: translateX(0) scaleX(1);
          }
          50% {
            transform: translateX(10px) scaleX(1.1);
          }
        }

        .animate-wave-slow {
          animation: wave-slow 12s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes vignette {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-vignette {
          animation: vignette 4s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-shine-slow {
          animation: shine 12s linear infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shine-vertical-slow {
          animation: shine-vertical 12s linear infinite;
        }

        @keyframes shine-vertical {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }

        .animate-grain {
          animation: grain 0.5s steps(6) infinite;
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-5%, -5%) }
          20% { transform: translate(-10%, 5%) }
          30% { transform: translate(5%, -10%) }
          40% { transform: translate(-5%, 15%) }
          50% { transform: translate(-10%, 5%) }
          60% { transform: translate(15%, 0) }
          70% { transform: translate(0, 10%) }
          80% { transform: translate(3%, 15%) }
          90% { transform: translate(-10%, 10%) }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: inline-flex;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          height: 100%;
        }

        .marquee-content {
          display: flex;
          position: absolute;
          white-space: nowrap;
          will-change: transform;
          animation: marquee 30s linear infinite;
        }

        .marquee-item {
          padding: 0 2rem;
          flex-shrink: 0;
        }

        .marquee-item span {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.025em;
          transition: all 0.3s ease;
        }

        .marquee-item:hover span {
          color: white;
          transform: scale(1.1);
          letter-spacing: 0.05em;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>

      <main>
        {/* Hero Section */}
        <section className="py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
          <HexagonLoader />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="relative inline-block group">
              <h1 className="heading heading-lg mb-8 tracking-in-contract-bck relative z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t('servicesPage.title')}
              </h1>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
            <p className="hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              {t('servicesPage.subtitle')}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/contact"
                className="px-6 py-3 rounded-lg bg-gray-800 dark:bg-white border border-gray-700 dark:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group flex items-center gap-2"
              >
                <span className="text-gray-200 dark:text-gray-700 font-medium group-hover:text-white dark:group-hover:text-gray-900">{t('cta.startProject')}</span>
                <span className="text-indigo-400 dark:text-indigo-500 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </a>
              <Link 
                href="/#agence" 
                className="px-6 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group flex items-center gap-2"
              >
                <span className="text-gray-700 dark:text-gray-200 font-medium">{t('cta.discoverAgency')}</span>
                <span className="text-indigo-500 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Bande de services cinématique */}
        <div className="relative h-20 my-16 overflow-hidden flex items-center justify-center">
          {/* Fond avec effet de film et mouvement */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          </div>
          
          {/* Contenu avec défilement */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ServiceMarquee />
          </div>

          {/* Effet de vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>

        {/* Services Grid Deux Colonnes - sobre et élégant */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="relative inline-block group">
                <h2 className="text-3xl font-bold mb-6 tracking-in-contract-bck relative z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('servicesPage.agencyTitle')}</h2>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('servicesPage.agencyIntro')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Liste des services à gauche */}
              <div className="flex flex-col gap-4">
                {services.map((service) => (
                  <button
                    key={service.title}
                    onClick={() => setSelectedService(service)}
                    className={`w-full text-left rounded-xl border transition-all p-5 flex items-center gap-4 shadow-sm font-semibold bg-white dark:bg-gray-800 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300/40 focus:border-indigo-500 duration-200 ${
                      selectedService?.title === service.title
                        ? 'border-2 border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-900/30 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className={`rounded-lg p-2 bg-indigo-100 dark:bg-indigo-900/30`}>
                      <service.icon className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{service.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Détail de chaque service, tous présents dans le DOM mais un seul visible */}
              <div className="relative w-full">
                {services.map((service) => {
                  const id = service.title.toLowerCase().replace(/\s|&/g, '-').replace(/[^a-z0-9\-]/g, '');
                  return (
                    <motion.div
                      key={service.title}
                      id={id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: selectedService?.title === service.title ? 1 : 0, y: selectedService?.title === service.title ? 0 : 20 }}
                      transition={{ duration: 0.4 }}
                      style={{ display: selectedService?.title === service.title ? 'block' : 'none' }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl sticky top-8"
                    >
                      {/* Si Web Design, afficher le code editor, si SEO & SEM l'image dynamique, si Marketing Mobile le mobile UI, si Social Media le SVG animé, sinon l'image */}
                      {service.title === 'Web Design' ? (
                        <div className="flex justify-center mb-6">
                          <CodeEditorDemo />
                        </div>
                      ) : service.title === 'SEO & SEM' ? (
                        <div className="relative h-64 mb-6 flex items-center justify-center z-10">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: [0, -12, 0, 12, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', type: 'spring' }}
                            className="w-full h-full flex items-center justify-center"
                          >
                            <div className="absolute inset-0 rounded-xl z-0 bg-gradient-to-br from-indigo-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-pulse" />
                            <motion.div
                              initial={{ filter: 'drop-shadow(0 0 0px #6366f1)' }}
                              animate={{ filter: [
                                'drop-shadow(0 0 0px #6366f1)',
                                'drop-shadow(0 0 24px #6366f1)',
                                'drop-shadow(0 0 0px #6366f1)'
                              ] }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                              className="relative z-10"
                              style={{ width: 'auto', height: '100%', maxHeight: '15rem', maxWidth: '90%' }}
                            >
                              <Image
                                src="/images/google-search-console.png"
                                alt="Google Search Console"
                                width={500}
                                height={300}
                                className="object-contain"
                                style={{ zIndex: 2 }}
                              />
                            </motion.div>
                          </motion.div>
                        </div>
                      ) : service.title === 'Marketing Mobile' ? (
                        <div className="flex justify-center mb-6">
                          <MobileDemo />
                        </div>
                      ) : service.title === 'Content Creator' ? (
                        <div className="flex justify-center mb-6">
                          <TypewriterDemo />
                        </div>
                      ) : service.title === 'UX/UI Design' ? (
                        <div className="flex justify-center mb-6">
                          <MacbookDemo />
                        </div>
                      ) : service.title === 'Social Media' ? (
                        <div className="flex justify-center mb-6">
                          <SocialMediaDemo />
                        </div>
                      ) : service.title === 'Innovation Digitale' ? (
                        <div className="flex justify-center mb-6">
                          <InnovationDemo />
                        </div>
                      ) : (
                        <div className="relative h-64 mb-6 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h2 className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-4">
                        {service.sectionTitle}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {service.sectionDescription}
                      </p>
                      <div className="mb-6">
                        <p className="text-gray-600 dark:text-gray-300">
                          {service.detailedDescription}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {service.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
                          >
                            <svg
                              className="w-5 h-5 text-indigo-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center">
                        <a href="/contact" className="btn-premium">Démarrer un projet</a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi nous choisir */}
        <div className="bg-gray-50 dark:bg-gray-900">
        <WhatToExpect />
        </div>

        {/* FAQ */}
        <div className="bg-gray-50 dark:bg-gray-900">
        <ContactFaqSection />
        </div>
      </main>
    </div>
  );
}
