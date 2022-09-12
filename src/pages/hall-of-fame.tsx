import React from 'react';

import { NextPage } from 'next';
import { Session } from 'next-auth';

import CustomHeader from '../components/CustomHeader';
import HallOfFameComponent from '../components/HallOfFame';
import { setServerSideSessionView } from '../lib/auth/serverSideSession';
import CyberAttack, { CyberAttackType } from '../models/CyberAttack';

export interface HallOfFameProps {
	session: Session;
	cyberAttacks: CyberAttackType[];
}

const HallOfFame: NextPage<HallOfFameProps> = ({ cyberAttacks, ...props }) => {
	return (
		<>
			<CustomHeader />

			<section className="flex flex-col items-center mb-5" {...props}>
				<h1 className="text-6xl font-bold m-10">היכל התהילה</h1>
				<div className="w-full xl:w-3/4 2xl:w-1/2 flex justify-center">
					<HallOfFameComponent cyberAttacks={cyberAttacks} />
				</div>
			</section>
		</>
	);
};

export const getServerSideProps = setServerSideSessionView<HallOfFameProps>(async () => {
	return {
		props: {
			cyberAttacks: JSON.parse(
				JSON.stringify(
					await CyberAttack.find({ verified: true })
						.sort({ date: -1 })
						.populate('author')
						.select('-markdownContent')
						.exec(),
				),
			) as CyberAttackType[],
		},
	};
});

export default HallOfFame;
