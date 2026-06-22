import { queryRef, executeQuery, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'skild-77739-service',
  location: 'asia-southeast2'
};

export const getSkillsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSkills', inputVars);
}
getSkillsRef.operationName = 'GetSkills';

export function getSkills(dcOrVars, vars) {
  return executeQuery(getSkillsRef(dcOrVars, vars));
}

