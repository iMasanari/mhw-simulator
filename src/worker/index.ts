import register from 'promise-worker/register'
import executeGlpk from './util/executeGlpk'

register(executeGlpk)
