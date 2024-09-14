"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_PERMISSIONS = exports.USER_ROLES = void 0;
exports.USER_ROLES = {
    MANAGER: 'manager',
    PRODUCTION_LEADER: 'production_leader',
    MACHINE_OPERATOR: 'machine_operator',
    QUALITY_INSPECTOR: 'quality_inspector',
    FORKLIFT_DRIVER: 'forklift_driver'
};
exports.ROLE_PERMISSIONS = {
    [exports.USER_ROLES.MANAGER]: [
        'create_job_order',
        'view_job_orders',
        'update_job_order',
        'delete_job_order',
        'create_pallet',
        'view_pallets',
        'update_pallet_status',
        'view_users',
        'create_user',
        'update_user',
        'delete_user'
    ],
    [exports.USER_ROLES.PRODUCTION_LEADER]: [
        'create_job_order',
        'view_job_orders',
        'update_job_order',
        'create_pallet',
        'view_pallets'
    ],
    [exports.USER_ROLES.MACHINE_OPERATOR]: [
        'view_job_orders',
        'view_pallets',
        'scan_pallet'
    ],
    [exports.USER_ROLES.QUALITY_INSPECTOR]: [
        'view_job_orders',
        'view_pallets',
        'update_pallet_status',
        'scan_pallet'
    ],
    [exports.USER_ROLES.FORKLIFT_DRIVER]: [
        'view_job_orders',
        'view_pallets',
        'update_pallet_status',
        'scan_pallet'
    ]
};
