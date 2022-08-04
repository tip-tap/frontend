import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Select, Divider, Space, Input, Button } from 'antd';
import { ReactComponent as Suffix } from "../assets/suffix.svg";
import styles from "../styles/components/customSelect.module.scss";

const { Option } = Select;
let index = 0;

const CustomSelect = ({ defaultValue, options, withAdd, onChange }) => {
  const [items, setItems] = useState([...options]);
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
  <>
    <Select
      className={styles.typography}
      style={{
        width: "100%",
        textAlign: "center",
      }}
      bordered={false}
      suffixIcon={<Suffix />}
      defaultValue={defaultValue}
      dropdownClassName={styles.typography}
      dropdownRender={
        withAdd ?
        (menu) => (
          <>
            {menu}
            <Divider
              style={{
                margin: '8px 0',
              }}
            />
            <Space
              style={{
                padding: '0 8px 4px',
              }}
            >
              <Input
                placeholder="추가하기.."
                ref={inputRef}
                value={name}
                onChange={onNameChange}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              </Button>
            </Space>
          </>
        )
        :
        null
      }
      onChange={onChange}
    >
        {items.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
    </Select>
  </>
  );
}

export default CustomSelect;