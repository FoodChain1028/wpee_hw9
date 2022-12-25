import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import {  Tabs, Badge  } from 'antd';
import { useLazyQuery } from "@apollo/client";
import { CHATBOX_QUERY } from "../graphql";



const LogIn = ({me, setName, onLogin}) => {
  const [show, setShow] = useState(0)
  const [findChatBox, {data}] = useLazyQuery(CHATBOX_QUERY);

    return (
      <>
        <Input.Search
          size="large"
          style={{ width: 300, margin: 50 }}
          prefix={<UserOutlined />}
          placeholder="Enter your name"
          value={me}
          onChange={(e) => setName(e.target.value)}
          enterButton="Sign In"
          onSearch={(name) => onLogin(name)}
        />
        
        {/* <Tabs
          defaultActiveKey="2"
          items={[0,1,2,3].map((i) => {
            const id = String(i + 1);
            return {
              label: (
                <span>
                  Tab {id}
                  <Badge count={show}  offset={[0, -22]}/>
                </span>
              ),
              key: id,
            };
          })}
        />
        <button onClick={() => {setShow((prev) => prev+1)}}>加</button>
        <button onClick={() => {setShow((prev) => prev-1)}}>減</button>
        <button onClick={async () => {
            await findChatBox({
              variables: {
                name1: "0",
                name2: "8"
           }})
           console.log(data);
        }}>FETCH</button>
        <br /> */}
      </>
       
    );
}

export default LogIn;