import React from 'react';

import { NextPage } from 'next';

import { setProtectedView } from '../../../lib/auth/serverSideSession';

export interface EditProps {}

const Edit: NextPage<EditProps> = () => {
	return (
		<div className="flex-1 flex flex-col items-center justify-center p-2">
			<div>hi</div>
		</div>
	);
};

export const getServerSideProps = setProtectedView();

export default Edit;
