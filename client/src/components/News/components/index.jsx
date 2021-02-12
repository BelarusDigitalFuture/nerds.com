import React from 'react'
import PropTypes from 'prop-types'

import { List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import digitalLogo from 'assets/digital.png';

const listData = [];
listData.push({
  href: 'https://geekcon.online/subject/belmova',
  title: 'Мини-соревнование во время финала Belarus Digital Future!',
  description: '12.02.2021',
  content:
    `
Во время финала хакатона Belarus Digital Future с 19:00 12 февраля станет доступно новое соревнование. Как участники, так и организаторы хакатона смогут пройти небольшой тест по белорусскому языку. Результаты будут доступны  сразу после завершения мини-соревнования.
      `,
  source: digitalLogo,
});

listData.push({
  href: 'https://geekcon.online/subject/belmova',
  title: 'Олимпиада по белорусскому уже в эту пятницу!',
  description: '10.02.2021',
  content:
    `
    12 февраля платформа geekcon.online проведёт свою первую олимпиаду по белорусскому языку и литературе. Участвовать в ней смогут школьники 10-х и 11-х классов. На решение задач даётся 45 минут. И не забудьте включить белорусскую раскладку клавиатуры.
Поспехаў вам!
    `,
  source: 'https://don16obqbay2c.cloudfront.net/wp-content/uploads/25-Proven-Social-Media-Contest-Ideas-to-Promote-Your-Online-Business-1584098454-2048x819.png'
});

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
              src={item.source}
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
