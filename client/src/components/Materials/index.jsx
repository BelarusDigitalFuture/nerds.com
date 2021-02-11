import React from 'react'
import PropTypes from 'prop-types'

import {Result, Button, Typography, PageHeader} from 'antd';
import {useParams} from 'react-router-dom';

import MainLayout from 'components/common/MainLayout';
const { Title, Paragraph, Text } = Typography;

const firstMaterial = () => {
  return (
    <Typography>
      <Title>Злучнік як часціна мовы</Title>
      <Paragraph>
        Злучнік — службовая часціна мовы, якая звязвае аднародныя члены сказа або часткі складанага сказа, сказы, часткі тэксту і паказвае на розныя адносіны паміж імі.
      </Paragraph>
      <Paragraph>
        <Text code>
          1. А начных замаразкаў зямля стала крамяністай і гулкай.
        </Text>
      </Paragraph>
      <Paragraph>
        У гэтым сказе злучнік і звязвае аднародныя члены сказа — выказнікі (стала) крамяністай, гулкай.
      </Paragraph>
      <Paragraph>
        <Text code>
          2. Гром страсянуў усё наваколле, і ўпалі першыя вялікія кроплі дажджу.
        </Text>
      </Paragraph>
      <Paragraph>
        У гэтым сказе злучнік і звязвае дзве часткі складанага сказа — 1) гром страсянуў усё наваколле, 2) упалі першыя вялікія кроплі дажджу.
      </Paragraph>
      <Paragraph>
        Злучнік звязвае:
      </Paragraph>
      <Paragraph>
        <ul>
          <li>
            аднародныя члены сказа;
          </li>
          <li>
            часткі складанага сказа;
          </li>
          <li>
            часткі тэксту.
          </li>
        </ul>
      </Paragraph>
    </Typography>
  )
};

const secondMaterial = () => {
  return (
    <Typography>
      <Title>Знакі прыпынку: сказы з адасобленымі дапаўненнямі</Title>
      <Paragraph>
        Дапаўненнем называецца даданы член сказа, які адказвае на пытанні ўскосных склонаў (усіх, акрамя назоўнага):
      </Paragraph>
      <Paragraph>
        <ul>
          <li>
            прачытаць кнігу (вінавальны)
          </li>
          <li>
            змагацца са злом (творны)
          </li>
        </ul>
      </Paragraph>
      <Paragraph>
        Развітым называецца дапаўненне, якое складаецца з некалькіх самастойных слоў:
      </Paragraph>
      <Paragraph>
        <Text code>
          Акрамя нашых суседзяў, на пляцоўцы былі і незнаёмыя людзі.
        </Text>
      </Paragraph>
      <Paragraph>
        Дапаўненні, выражаныя  спалучэннем назоўнікаў з прыназоўнікамі <Text strong>апрача, акрамя, замест, за выключэнне </Text> і інш., адасабляюцца незалежна ад месца адносна паяснёга слова і месца ў сказе (у пачатку, сярэдзіне ці канцы сказа):
      </Paragraph>
      <Paragraph>
        <Text code>
          Усе, акрамя Цімафея, спыніліся.
        </Text>
      </Paragraph>
      <Paragraph>
        Адасобленыя дапаўненні звычайна маюць значэнне ўключэння, выключэння ці замяшчэння:
      </Paragraph>
      <Paragraph>
        <Text code>
          Акрамя студэнтаў, на сустрэчы з вядомым пісьменнікам прыйшлі і некаторыя выкладчыкі.
        </Text>
        &nbsp;(і студэнты, і выкладчыкі, таму выяўляецца значэнне ўключэння).
      </Paragraph>
      <Paragraph>
        <Text code>
          Замест даклада, на пасяджэнні адбыўся дыялог паміж выступоўцам і слухачамі.
        </Text>
        &nbsp;(даклад заменены, замешчаны дыялогам)
      </Paragraph>
      <Paragraph>
        За выключэннем можа быць як прыназоўнікам (тады да яго нельга паставіць пытання, разам з назоўнікам выступае ў ролі адасобленага дапаўнення), так і назоўнікам з прыназоўнікам (да яго можна паставіць пытанне, не з’яўляецца адасаобленым дапаўненнем). Напрыклад:
      </Paragraph>
      <Paragraph>
        <Text code>
          За выключэннем электрачайніка з разеткі сачыць трэба асабліва ўважліва.
        </Text>
        &nbsp;(сачыць за чым? за выключэннем)
      </Paragraph>
      <Paragraph>
        Дапаўненне з прыназоўнікам замест адасабляецца, калі мае значэнне замяшчэння (нельга выкарыстаць прыназоўнік за):
      </Paragraph>
      <Paragraph>
        <Text code>
          Замест адказу, прагучала патрабаванне.
        </Text>
        &nbsp;(адказ замяшчаецца патрабаваннем)
      </Paragraph>
      <Paragraph>
        Для параўнання:
      </Paragraph>
      <Paragraph>
        <Text code>
          Ён быў ў яго замест перакладчыка.
        </Text>
        &nbsp;(быў за перакладчыка)
      </Paragraph>
    </Typography>
  )
};



const Materials = () => {
  const { materialId } = useParams();

  const getMaterial = () => {
    switch (materialId) {
      case '1':
        return firstMaterial();
      case '2':
        return secondMaterial();
      default:
        return firstMaterial();
    }
  };

  return (
    <MainLayout>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Назад"
        style={{ padding: 0 }}
      />
      {getMaterial()}
    </MainLayout>
  );
};

Materials.propTypes = {
};

export default Materials;
