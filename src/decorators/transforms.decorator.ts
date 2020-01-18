/* tslint:disable:naming-convention */
'use strict';

import { Transform } from 'class-transformer';
import * as _ from 'lodash';

export const Trim = () =>
    Transform((value: string | string[]) => {
        if (_.isArray(value)) {
            return value.map(v => _.trim(v).replace(/\s\s+/g, ' '));
        }
        return _.trim(value).replace(/\s\s+/g, ' ');
    });

export const ToInt = () =>
    Transform(value => parseInt(value, 10), { toClassOnly: true });