import React from 'react'
import PropTypes from 'prop-types'

import { List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 1; i++) {
  listData.push({
    href: 'https://geekcon.online/subject/belmova',
    title: 'Олимпиада по белорусскому уже в эту пятницу!',
    description: '10.02.2021',
    content:
      `
      12 февраля платформа geekcon.online проведёт свою первую олимпиаду по белорусском языку и литературе. Участвовать в ней смогут школьники 10-х классов. На решение задач даётся 45 минут. И не забудьте включить белорусскую раскладку клавиатуры.
Поспехаў вам!
      `,
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const News = props => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={listData}
      renderItem={(item, index) => (
        <List.Item
          key={index}
          // actions={[
          //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          // ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://don16obqbay2c.cloudfront.net/wp-content/uploads/25-Proven-Social-Media-Contest-Ideas-to-Promote-Your-Online-Business-1584098454-2048x819.png"
            />
          }
        >
          <List.Item.Meta
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  )
};

News.propTypes = {

};

export default News;
