import React from 'react';
import {shallow, mount} from 'enzyme';
import '../setupTests.js';

import ConfirmReset from '../components/confirm-reset.js';

describe('<ConfirmReset />', () => {
    it('Renders without crashing', () => {
        shallow(<ConfirmReset />);
    });
});
