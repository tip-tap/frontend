import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Select, Divider, Space, Input, Button, Tooltip } from 'antd';
import { ReactComponent as Suffix } from "../assets/suffix.svg";
import styles from "../styles/components/customSelect.module.scss";

const { Option } = Select;
let index = 0;

const CustomSelect = ({ defaultValue, options, withAdd, onChange, value, suffix }) => {
  const [items, setItems] = useState([...options]);
  const [name, setName] = useState('');
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    if (isNaN(event.target.value)) { setIsTooltipVisible(true);}
    else { setIsTooltipVisible(false); }

    setName(isNaN(parseInt(event.target.value)) ? "" : parseInt(event.target.value));
  };

  const addItem = (e) => {
    e.preventDefault();
    setIsTooltipVisible(false);
    setItems([...items, name + suffix || `New item ${index++}`]);
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
              <Tooltip title="정수만 입력 가능" visible={isTooltipVisible}>
                <Input
                  placeholder="추가하기.."
                  ref={inputRef}
                  value={name}
                  onChange={onNameChange}
                  suffix={suffix}
                />
              </Tooltip>
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              </Button>
            </Space>
          </>
        )
        :
        null
      }
      onChange={onChange}
      value={value}
    >
        {items.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
    </Select>
  </>
  );
}

export default CustomSelect;