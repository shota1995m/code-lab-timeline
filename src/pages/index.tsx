import { ActivityChronology } from 'components/ActivityChronology';
import { Header } from 'components/Header';
import { sites } from 'config/sites';
import { NextPage } from 'next';
import NextHeadSeo from 'next-head-seo';
import { getActivities } from 'utils/getActivities';
import {
  ActivityChronology as ActivityChronologyType,
  groupByYear,
} from 'utils/groupByYear';

export async function getStaticProps() {
  const activityChronologies = groupByYear({
    activities: await getActivities({ urls: sites }),
  });

  return { props: { activityChronologies }, revalidate: 1 };
}

interface Props {
  activityChronologies: ActivityChronologyType[];
}

const Home: NextPage<Props> = ({ activityChronologies }) => {
  return (
    <div className="container mx-auto px-5">
      <NextHeadSeo title="code lab | Timeline" />
      <div className="mb-10">
        <Header />
      </div>
      <h2 className="text-2xl font-bold">Timeline</h2>
      <div className="py-10">
        {activityChronologies.map((activityChronology, index) => (
          <ActivityChronology
            key={index}
            activityChronology={activityChronology}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
