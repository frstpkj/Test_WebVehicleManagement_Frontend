"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/navigation";

const items: MenuProps["items"] = [
  {
    label: "Homepage",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "View",
    key: "/view",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Edit",
    key: "/editMenu",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "group",
        children: [
          {
            label: "Add vehicle",
            key: "/add",
          },
          {
            label: "Edit vehicle",
            key: "/edit",
          },
          {
            label: "Delete vehicle",
            key: "/delete",
          },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const router = useRouter();
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log(e.key);
    router.replace(e.key);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}
