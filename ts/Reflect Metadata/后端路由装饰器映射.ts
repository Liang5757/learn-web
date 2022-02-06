import 'reflect-metadata'

const METHOD_METADATA = 'method'
const PATH_METADATA = 'path'
// װ������������,����·�ɵ�·��path����һ��װ����
const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  }
}

// װ������������,���Ƚ���һ������,����get/post,����ٽ���һ��·��·��,����һ��Я��������������Ϣ��װ����
const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value!);
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value!);
  }
}

const Get = createMappingDecorator('GET');
const Post = createMappingDecorator('POST');


function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance);

  // ɸѡ����� methodName
  const methodsNames = Object.getOwnPropertyNames(prototype)
  return methodsNames.map(methodName => {
    const fn = prototype[methodName];
    
    // ȡ������� metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn);
    const method = Reflect.getMetadata(METHOD_METADATA, fn);
    return {
      route,
      method,
      fn,
      methodName
    }
  })
}

// ʵ��Ч��
@Controller('/article')
class Home {
  @Get('/content')
  someGetMethod() {
    return 'hello world';
  }
  
  @Post('/comment')
  somePostMethod() {}
}

const info = mapRoute(new Home());
console.log(info);
